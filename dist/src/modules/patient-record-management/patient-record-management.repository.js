"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRecordsRepository = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const appointments_entity_1 = require("../../shared/entity/appointments.entity");
const users_entity_1 = require("../../shared/entity/users.entity");
const role_enum_1 = require("../../shared/enum/role.enum");
const throw_exception_1 = require("../../shared/utility/throw-exception");
const typeorm_1 = require("typeorm");
const consultations_entity_1 = require("../../shared/entity/consultations.entity");
const patients_entity_1 = require("../../shared/entity/patients.entity");
const common_functions_methods_1 = require("../../shared/utility/common-functions.methods");
let PatientRecordsRepository = class PatientRecordsRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(consultations_entity_1.Consultations, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createPatient(createPatientDto, user) {
        try {
            const { firstName, lastName, email, gender, password, ...patientData } = createPatientDto;
            await (0, common_functions_methods_1.checkEmailExists)(email);
            const salt = await bcrypt.genSalt();
            const patient = users_entity_1.Users.create({
                firstName,
                lastName,
                gender,
                role: role_enum_1.Role.PATIENT,
                email: email,
                salt,
                password
            });
            await this.dataSource.getRepository(users_entity_1.Users).save(patient);
            const patientDetails = patients_entity_1.Patients.create({
                userId: patient.id,
                ...patientData
            });
            await this.dataSource.getRepository(patients_entity_1.Patients).save(patientDetails);
            return this.getPatientDetails(patient.id);
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async getAllPatients(dto, user) {
        try {
            const { limit, offset } = dto;
            const query = this.manager.createQueryBuilder(users_entity_1.Users, 'user')
                .leftJoinAndSelect('user.patient', 'patient')
                .leftJoin('user.appointmentPatient', 'appointment')
                .select([
                'user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.gender', 'user.createdAt', 'user.updatedAt', 'patient.id', 'patient.contactNumber', 'patient.address', 'patient.dob'
            ])
                .where('user.role = :role AND user.isActive = true', { role: role_enum_1.Role.PATIENT });
            if (user.role === role_enum_1.Role.DOCTOR) {
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
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async getPatientDetails(id) {
        try {
            const patient = await this.manager.createQueryBuilder(users_entity_1.Users, 'user')
                .leftJoinAndSelect('user.patient', 'patient')
                .leftJoin('user.appointmentPatient', 'appointment', 'appointment.patientId = user.id')
                .select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.gender', 'patient.id', 'patient.contactNumber', 'patient.address', 'patient.dob'])
                .where(`(user.isActive = true AND user.id = :userId)`, { userId: id })
                .getOne();
            if (!patient)
                throw new common_1.NotFoundException('Patient not found');
            return patient;
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async updatePatient(id, updatePatientDto, user) {
        try {
            const { firstName, lastName, email, gender, ...patientData } = updatePatientDto;
            const query = this.manager.createQueryBuilder(users_entity_1.Users, 'user')
                .leftJoinAndSelect('user.patient', 'patient')
                .leftJoin('user.appointmentPatient', 'appointment')
                .select([
                'user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.gender', 'user.createdAt', 'user.updatedAt', 'patient.id', 'patient.contactNumber', 'patient.address', 'patient.dob'
            ])
                .where('user.role = :role AND user.isActive = true AND user.id = :id', { role: role_enum_1.Role.PATIENT, id });
            if (user.role === role_enum_1.Role.DOCTOR) {
                query.andWhere('appointment.doctorId = :doctorId', { doctorId: user.id });
            }
            const patient = await query.getOne();
            if (!patient)
                throw new common_1.NotFoundException('Patient not found');
            patient.firstName = updatePatientDto.firstName || patient.firstName;
            patient.lastName = updatePatientDto.lastName || patient.lastName;
            patient.gender = updatePatientDto.gender || patient.gender;
            patient.updatedAt = new Date();
            await patient.save();
            if (patient.patient[0]) {
                const patientDetails = patient.patient[0];
                patientDetails.contactNumber = updatePatientDto.contactNumber || patientDetails.contactNumber;
                patientDetails.address = updatePatientDto.address || patientDetails.address;
                patientDetails.dob = updatePatientDto.dob || patientDetails.dob;
                await patientDetails.save();
            }
            else {
                const patientDetails = patients_entity_1.Patients.create({
                    userId: patient.id,
                    ...patientData
                });
                await this.dataSource.getRepository(patients_entity_1.Patients).save(patientDetails);
            }
            return await this.getPatientDetails(id);
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async createConsultation(dto, user) {
        try {
            const query = this.manager.createQueryBuilder(appointments_entity_1.Appointments, 'appointment')
                .where(`appointment.id = :appointmentId AND appointment.isDeleted = false`, { appointmentId: dto.appointmentId });
            if (user.role === role_enum_1.Role.DOCTOR) {
                query.andWhere(`appointment.doctorId = :doctorId`, { doctorId: user.id });
            }
            const appointExits = await query.getOne();
            if (!appointExits)
                throw new common_1.NotFoundException(`Appointment not found`);
            const consultationExists = await consultations_entity_1.Consultations.findOne({
                select: ['id'],
                where: { appointmentId: dto.appointmentId }
            });
            if (consultationExists)
                throw new common_1.ConflictException(`Consultation already exists for this appointment.`);
            const record = this.create({
                appointmentId: dto.appointmentId,
                ...dto
            });
            return await this.save(record);
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async getRecord(appointmentId, user) {
        try {
            const query = this.createQueryBuilder('consultation')
                .leftJoinAndSelect('consultation.appointment', 'appointment')
                .leftJoinAndSelect('appointment.doctors', 'doctor')
                .leftJoinAndSelect('appointment.patients', 'patient')
                .select([
                'consultation', 'appointment.id', 'appointment.patientId', 'appointment.doctorId', 'appointment.status', 'appointment.dateTime', 'appointment.createdAt', 'doctor.firstName', 'doctor.lastName', 'patient.firstName', 'patient.lastName'
            ])
                .where(`(appointment.isDeleted = false AND consultation.appointmentId = :appointmentId)`, { appointmentId });
            if (user.role === role_enum_1.Role.DOCTOR) {
                query.andWhere(`(appointment.doctorId = :userId)`, { userId: user.id });
            }
            else if (user.role === role_enum_1.Role.PATIENT) {
                query.andWhere(`(appointment.patientId = :userId)`, { userId: user.id });
            }
            const record = await query.getOne();
            if (!record)
                throw new common_1.NotFoundException(`Record not found`);
            return record;
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
};
exports.PatientRecordsRepository = PatientRecordsRepository;
exports.PatientRecordsRepository = PatientRecordsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], PatientRecordsRepository);
//# sourceMappingURL=patient-record-management.repository.js.map