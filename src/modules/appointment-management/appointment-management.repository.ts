import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Appointments } from "src/shared/entity/appointments.entity";
import { Users } from "src/shared/entity/users.entity";
import { Role } from "src/shared/enum/role.enum";
import { throwException } from "src/shared/utility/throw-exception";
import { DataSource, Repository } from "typeorm";
import { PageQueryDto } from "./dto/list-appointments.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { CreateAppointmentByAdminDto, CreateAppointmentByPatientDto } from "./dto/create-appointment-patient.dto";
import { AppointmentStatus } from "src/shared/enum/appointment-status.enum";
import { checkAppointCreated, checkAppointmentExists, checkNotPastDate, checkUserExists } from "src/shared/utility/common-functions.methods";

@Injectable()
export class AppointmentRepository extends Repository<Appointments> {
   constructor(
      readonly dataSource: DataSource,
   ) {
      super(Appointments, dataSource.createEntityManager());
   }

   /**
    * Creates a new appointment for a patient.
    *
    * @param createAppointmentDto - The data required to create a new appointment.
    * @param patientId - The ID of the patient creating the appointment.
    * @returns The created appointment.
    * @throws ConflictException if an appointment already exists for the given doctor and patient.
    * @throws any other exceptions that may occur during the operation.
    */
   async createAppointmentByPatient(createAppointmentDto: CreateAppointmentByPatientDto, patientId: string): Promise<Appointments> {
      try {

         const { doctorId, dateTime } = createAppointmentDto;

         // Validate doctor existence
         await checkUserExists(doctorId, Role.DOCTOR);

         // check if appointment already created
         const appointExits = await checkAppointCreated(doctorId, patientId);
         if (appointExits) throw new ConflictException(`Appointment already exists.`);

         const appointment = this.create({
            patientId,
            doctorId,
            dateTime,
            status: AppointmentStatus.PENDING, // Set the initial status Pending for Patient
            createdBy: patientId
         });

         return await this.save(appointment);
      } catch (error) {
         throwException(error)
      }
   }

   /**
    * Creates a new appointment for a patient by an admin.
    *
    * @param createAppointmentDto - The data required to create a new appointment.
    * @param adminId - The ID of the admin creating the appointment.
    * @returns The created appointment.
    * @throws ConflictException if an appointment already exists for the given doctor and patient.
    * @throws any other exceptions that may occur during the operation.
    */
   async createAppointmentByAdmin(createAppointmentDto: CreateAppointmentByAdminDto, adminId: string): Promise<Appointments> {
      try {
         const { doctorId, dateTime, patientId } = createAppointmentDto;

         // Validate doctor existence
         await checkUserExists(doctorId, Role.DOCTOR);

         // Validate patient existence
         await checkUserExists(patientId, Role.PATIENT);

         // check if appointment already created
         const appointExits = await checkAppointCreated(doctorId, patientId);
         if (appointExits) throw new ConflictException(`Appointment already exists.`);

         // Check if the date is not in the past
         await checkNotPastDate('Appointment date', dateTime);

         const appointment = this.create({
            patientId,
            doctorId,
            dateTime,
            status: AppointmentStatus.CONFIRMED, // Set the initial status Confirmed for Admin
            createdBy: adminId
         });

         return await this.save(appointment);
      } catch (error) {
         throwException(error)
      }

   }

   /**
    * Retrieves a list of appointments based on the provided query parameters and the user's role.
    *
    * @param dto - The page query parameters, including the limit and offset.
    * @param user - The user making the request.
    * @returns An object containing the list of appointments and the total number of results.
    * @throws any exceptions that may occur during the operation.
    */
   async getAppointments(dto: PageQueryDto, user: Users) {
      try {
         const { limit, offset } = dto;
         const query = this.createQueryBuilder('appointment')
            .leftJoinAndSelect('appointment.doctors', 'doctor')
            .leftJoinAndSelect('appointment.patients', 'patient')
            .where(`(appointment.isDeleted = false)`)
            .select(['appointment.id', 'appointment.patientId', 'appointment.doctorId', 'appointment.status', 'appointment.dateTime', 'appointment.createdAt', 'doctor.firstName', 'doctor.lastName', 'patient.firstName', 'patient.lastName'])

         if (user.role === Role.DOCTOR) {
            query.andWhere(`(appointment.doctorId = :userId)`, { userId: user.id })
         }

         const [appointments, totalResults] = await query.orderBy('appointment.createdAt', 'DESC')
            .limit(limit)
            .offset(offset)
            .getManyAndCount();

         return {
            appointments,
            totalResults
         }

      } catch (error) {
         throwException(error);
      }
   }

   /**
    * Updates an appointment with the provided ID and DTO, considering the user's role.
    *
    * @param id - The ID of the appointment to update.
    * @param dto - The update data for the appointment.
    * @param user - The user making the update request.
    * @returns The updated appointment.
    * @throws NotFoundException if the appointment is not found.
    * @throws BadRequestException if the user is a patient and tries to update the status to something other than canceled, or if the appointment is already completed.
    * @throws any other exceptions that may occur during the operation.
    */
   async updateAppointment(id: number, dto: UpdateAppointmentDto, user: Users) {
      try {
         if (user.role === Role.PATIENT && dto.status !== AppointmentStatus.CANCELED) {
            throw new BadRequestException('Invalid status.')
         }

         const query = this.createQueryBuilder('appointment')
            .where(`(appointment.id = :id AND appointment.isDeleted = false)`, { id })

         if (user.role === Role.DOCTOR) {
            query.andWhere(`(appointment.doctorId = :userId)`, { userId: user.id })
         } else if (user.role === Role.PATIENT) {
            query.andWhere(`(appointment.patientId = :userId)`)
         }
         const appointment = await query.getOne();

         if (!appointment) {
            throw new NotFoundException(`Appointment not found.`)
         } else if (appointment.status === AppointmentStatus.COMPLETED) {
            throw new BadRequestException(`Appointment already completed.`)
         }

         appointment.status = dto.status;
         appointment.updatedBy = user.id;
         return appointment.save();

      } catch (error) {
         throwException(error);
      }
   }

   /**
    * Deletes an appointment with the provided ID, considering the user's role.
    *
    * @param id - The ID of the appointment to delete.
    * @param user - The user making the delete request.
    * @throws NotFoundException if the appointment is not found or the user is a patient and the appointment does not belong to them.
    */
   async deleteAppointment(id: number, user: Users) {
      const appointment = await checkAppointmentExists(id);

      if (!appointment || (user.role === Role.PATIENT && appointment.patientId !== user.id)) {
         throw new NotFoundException(`No appointments found.`)
      }

      appointment.isDeleted = true;
      await appointment.save();

   }
}