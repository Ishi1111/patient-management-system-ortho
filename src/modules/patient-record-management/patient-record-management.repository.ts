import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Appointments } from "src/shared/entity/appointments.entity";
import { Users } from "src/shared/entity/users.entity";
import { Role } from "src/shared/enum/role.enum";
import { throwException } from "src/shared/utility/throw-exception";
import { DataSource, Repository } from "typeorm";
import { Consultations } from "src/shared/entity/consultations.entity";
import { CreateConsultationDto } from "./dto/create-patient-record.dto";
import { CreatePatientDto, UpdatePatientDto } from "./dto/create-patient.dto";
import { PageQueryDto } from "./dto/list-users.dto";
import { Patients } from "src/shared/entity/patients.entity";
import { checkEmailExists } from "src/shared/utility/common-functions.methods";

@Injectable()
export class PatientRecordsRepository extends Repository<Consultations> {
   constructor(
      readonly dataSource: DataSource,
   ) {
      super(Consultations, dataSource.createEntityManager());
   }

   /**
    * Creates a new patient in the database, including both user and patient-specific information.
    *
    * @param createPatientDto - The data transfer object containing the details of the patient to be created.
    *                           Includes user fields (firstName, lastName, email, etc.) and patient-specific fields.
    * @param user - The current authenticated user, used for validations and associations if required.
    * @returns A Promise that resolves to the newly created patient's details.
    * @throws ConflictException if a user with the provided email already exists.
    * @throws InternalServerErrorException for any unexpected database or processing errors.
    */
   async createPatient(createPatientDto: CreatePatientDto, user: Users): Promise<Users> {
      try {
         const { firstName, lastName, email, gender, password, ...patientData } = createPatientDto;

         //check if email exists
         await checkEmailExists(email);

         const salt = await bcrypt.genSalt();

         const patient = Users.create({
            firstName,
            lastName,
            gender,
            role: Role.PATIENT,
            email: email,
            salt,
            password
         });
         await this.dataSource.getRepository(Users).save(patient);

         const patientDetails = Patients.create({
            userId: patient.id,
            ...patientData
         });
         await this.dataSource.getRepository(Patients).save(patientDetails);

         return this.getPatientDetails(patient.id);

      } catch (error) {
         throwException(error);
      }
   }

   /**
   * Retrieves a paginated list of all patients from the database.
   *
   * @param dto - The pagination and filter criteria provided by the client.
   * @param user - The current authenticated user, used to filter patients for doctors.
   * @returns A Promise that resolves to an object containing:
   *          - `patients`: The list of patients matching the criteria.
   *          - `totalResults`: The total number of patients available.
   * @throws UnauthorizedException if the user is a doctor attempting to access unauthorized patient records.
   * @throws InternalServerErrorException for any unexpected database or processing errors.
   */
   async getAllPatients(dto: PageQueryDto, user: Users) {
      try {
         const { limit, offset } = dto;

         const query = this.manager.createQueryBuilder(Users, 'user')
            .leftJoinAndSelect('user.patient', 'patient')
            .leftJoin('user.appointmentPatient', 'appointment')
            .select([
               'user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.gender', 'user.createdAt', 'user.updatedAt', 'patient.id', 'patient.contactNumber', 'patient.address', 'patient.dob'
            ])
            .where('user.role = :role AND user.isActive = true', { role: Role.PATIENT });

         // doctor can see only their patients
         if (user.role === Role.DOCTOR) {
            query.andWhere('appointment.doctorId = :doctorId', { doctorId: user.id });
         }

         const [patients, totalResults] = await query
            .orderBy('appointment.createdAt', 'DESC')
            .limit(limit)
            .offset(offset)
            .getManyAndCount();

         return {
            patients,
            totalResults,
         };
      } catch (error) {
         throwException(error);
      }
   }

   /**
    * Retrieves the details of a specific patient by their ID.
    *
    * @param id - The unique ID of the patient to retrieve.
    * @returns A Promise that resolves to the patient's details, including user and patient-specific information.
    * @throws NotFoundException if the patient is not found.
    * @throws InternalServerErrorException for any unexpected database or processing errors.
    */
   async getPatientDetails(id: string): Promise<Users> {
      try {
         const patient = await this.manager.createQueryBuilder(Users, 'user')
            .leftJoinAndSelect('user.patient', 'patient')
            .leftJoin('user.appointmentPatient', 'appointment', 'appointment.patientId = user.id')
            .select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.gender', 'patient.id', 'patient.contactNumber', 'patient.address', 'patient.dob'])
            .where(`(user.isActive = true AND user.id = :userId)`, { userId: id })
            .getOne();

         if (!patient) throw new NotFoundException('Patient not found');
         return patient;

      } catch (error) {
         throwException(error)
      }
   }

   /**
    * Updates the details of a patient in the database.
    *
    * @param id - The user ID of the patient to be updated.
    * @param updatePatientDto - The data transfer object containing the updated patient information.
    * @param user - The current user object.
    * @returns A Promise that resolves to the updated patient details.
    * @throws NotFoundException if the patient is not found.
    */
   async updatePatient(id: string, updatePatientDto: UpdatePatientDto, user: Users) {
      try {
         const { firstName, lastName, email, gender, ...patientData } = updatePatientDto;

         const query = this.manager.createQueryBuilder(Users, 'user')
            .leftJoinAndSelect('user.patient', 'patient')
            .leftJoin('user.appointmentPatient', 'appointment')
            .select([
               'user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.gender', 'user.createdAt', 'user.updatedAt', 'patient.id', 'patient.contactNumber', 'patient.address', 'patient.dob'
            ])
            .where('user.role = :role AND user.isActive = true AND user.id = :id', { role: Role.PATIENT, id });

         // doctor can only see assigned patients
         if (user.role === Role.DOCTOR) {
            query.andWhere('appointment.doctorId = :doctorId', { doctorId: user.id });
         }

         const patient = await query.getOne();
         if (!patient) throw new NotFoundException('Patient not found');

         patient.firstName = updatePatientDto.firstName || patient.firstName;
         patient.lastName = updatePatientDto.lastName || patient.lastName;
         patient.gender = updatePatientDto.gender || patient.gender;
         patient.updatedAt = new Date();
         await patient.save();

         if (patient.patient[0]) {
            //update details
            const patientDetails = patient.patient[0];
            patientDetails.contactNumber = updatePatientDto.contactNumber || patientDetails.contactNumber;
            patientDetails.address = updatePatientDto.address || patientDetails.address;
            patientDetails.dob = updatePatientDto.dob || patientDetails.dob;
            await patientDetails.save();
         } else {
            //add details
            const patientDetails = Patients.create({
               userId: patient.id,
               ...patientData
            });
            await this.dataSource.getRepository(Patients).save(patientDetails);
         }

         return await this.getPatientDetails(id);

      } catch (error) {
         throwException(error)
      }
   }

   /**
    * Creates a new consultation record in the database.
    *
    * @param dto - The data transfer object containing the necessary information to create a new consultation.
    * @param user - The user object representing the current user.
    * @returns A Promise that resolves to the newly created consultation record.
    * @throws NotFoundException if the appointment associated with the consultation does not exist.
    * @throws ConflictException if a consultation already exists for the given appointment.
    */
   async createConsultation(dto: CreateConsultationDto, user: Users): Promise<Consultations> {
      try {
         // Validate appointment existence
         const query = this.manager.createQueryBuilder(Appointments, 'appointment')
            .where(`appointment.id = :appointmentId AND appointment.isDeleted = false`, { appointmentId: dto.appointmentId })

         if (user.role === Role.DOCTOR) {
            query.andWhere(`appointment.doctorId = :doctorId`, { doctorId: user.id })
         }

         const appointExits = await query.getOne();
         if (!appointExits) throw new NotFoundException(`Appointment not found`);

         const consultationExists = await Consultations.findOne({
            select: ['id'],
            where: { appointmentId: dto.appointmentId }
         });
         if (consultationExists) throw new ConflictException(`Consultation already exists for this appointment.`);

         const record = this.create({
            appointmentId: dto.appointmentId,
            ...dto
         });

         return await this.save(record);
      } catch (error) {
         throwException(error)
      }
   }

   /**
    * Retrieves a consultation record from the database based on the provided appointment ID and the current user's role.
    *
    * @param appointmentId - The ID of the appointment associated with the consultation record.
    * @param user - The current user object.
    * @returns A Promise that resolves to the consultation record.
    * @throws NotFoundException if the record is not found.
    */
   async getRecord(appointmentId: number, user: Users): Promise<Consultations> {
      try {
         const query = this.createQueryBuilder('consultation')
            .leftJoinAndSelect('consultation.appointment', 'appointment')
            .leftJoinAndSelect('appointment.doctors', 'doctor')
            .leftJoinAndSelect('appointment.patients', 'patient')
            .select([
               'consultation', 'appointment.id', 'appointment.patientId', 'appointment.doctorId', 'appointment.status', 'appointment.dateTime', 'appointment.createdAt', 'doctor.firstName', 'doctor.lastName', 'patient.firstName', 'patient.lastName'
            ])
            .where(`(appointment.isDeleted = false AND consultation.appointmentId = :appointmentId)`, { appointmentId })

         if (user.role === Role.DOCTOR) {
            query.andWhere(`(appointment.doctorId = :userId)`, { userId: user.id })
         } else if (user.role === Role.PATIENT) {
            query.andWhere(`(appointment.patientId = :userId)`, { userId: user.id })
         }

         const record = await query.getOne();

         if (!record) throw new NotFoundException(`Record not found`);
         return record;

      } catch (error) {
         throwException(error);
      }
   }


}