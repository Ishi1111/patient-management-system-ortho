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
exports.AppointmentRepository = void 0;
const common_1 = require("@nestjs/common");
const appointments_entity_1 = require("../../shared/entity/appointments.entity");
const role_enum_1 = require("../../shared/enum/role.enum");
const throw_exception_1 = require("../../shared/utility/throw-exception");
const typeorm_1 = require("typeorm");
const appointment_status_enum_1 = require("../../shared/enum/appointment-status.enum");
const common_functions_methods_1 = require("../../shared/utility/common-functions.methods");
let AppointmentRepository = class AppointmentRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(appointments_entity_1.Appointments, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createAppointmentByPatient(createAppointmentDto, patientId) {
        try {
            const { doctorId, dateTime } = createAppointmentDto;
            await (0, common_functions_methods_1.checkUserExists)(doctorId, role_enum_1.Role.DOCTOR);
            const appointExits = await (0, common_functions_methods_1.checkAppointCreated)(doctorId, patientId);
            if (appointExits)
                throw new common_1.ConflictException(`Appointment already exists.`);
            const appointment = this.create({
                patientId,
                doctorId,
                dateTime,
                status: appointment_status_enum_1.AppointmentStatus.PENDING,
                createdBy: patientId
            });
            return await this.save(appointment);
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async createAppointmentByAdmin(createAppointmentDto, adminId) {
        try {
            const { doctorId, dateTime, patientId } = createAppointmentDto;
            await (0, common_functions_methods_1.checkUserExists)(doctorId, role_enum_1.Role.DOCTOR);
            await (0, common_functions_methods_1.checkUserExists)(patientId, role_enum_1.Role.PATIENT);
            const appointExits = await (0, common_functions_methods_1.checkAppointCreated)(doctorId, patientId);
            if (appointExits)
                throw new common_1.ConflictException(`Appointment already exists.`);
            await (0, common_functions_methods_1.checkNotPastDate)('Appointment date', dateTime);
            const appointment = this.create({
                patientId,
                doctorId,
                dateTime,
                status: appointment_status_enum_1.AppointmentStatus.CONFIRMED,
                createdBy: adminId
            });
            return await this.save(appointment);
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async getAppointments(dto, user) {
        try {
            const { limit, offset } = dto;
            const query = this.createQueryBuilder('appointment')
                .leftJoinAndSelect('appointment.doctors', 'doctor')
                .leftJoinAndSelect('appointment.patients', 'patient')
                .where(`(appointment.isDeleted = false)`)
                .select(['appointment.id', 'appointment.patientId', 'appointment.doctorId', 'appointment.status', 'appointment.dateTime', 'appointment.createdAt', 'doctor.firstName', 'doctor.lastName', 'patient.firstName', 'patient.lastName']);
            if (user.role === role_enum_1.Role.DOCTOR) {
                query.andWhere(`(appointment.doctorId = :userId)`, { userId: user.id });
            }
            const [appointments, totalResults] = await query.orderBy('appointment.createdAt', 'DESC')
                .limit(limit)
                .offset(offset)
                .getManyAndCount();
            return {
                appointments,
                totalResults
            };
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async updateAppointment(id, dto, user) {
        try {
            if (user.role === role_enum_1.Role.PATIENT && dto.status !== appointment_status_enum_1.AppointmentStatus.CANCELED) {
                throw new common_1.BadRequestException('Invalid status.');
            }
            const query = this.createQueryBuilder('appointment')
                .where(`(appointment.id = :id AND appointment.isDeleted = false)`, { id });
            if (user.role === role_enum_1.Role.DOCTOR) {
                query.andWhere(`(appointment.doctorId = :userId)`, { userId: user.id });
            }
            else if (user.role === role_enum_1.Role.PATIENT) {
                query.andWhere(`(appointment.patientId = :userId)`);
            }
            const appointment = await query.getOne();
            if (!appointment) {
                throw new common_1.NotFoundException(`Appointment not found.`);
            }
            else if (appointment.status === appointment_status_enum_1.AppointmentStatus.COMPLETED) {
                throw new common_1.BadRequestException(`Appointment already completed.`);
            }
            appointment.status = dto.status;
            appointment.updatedBy = user.id;
            return appointment.save();
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async deleteAppointment(id, user) {
        const appointment = await (0, common_functions_methods_1.checkAppointmentExists)(id);
        if (!appointment || (user.role === role_enum_1.Role.PATIENT && appointment.patientId !== user.id)) {
            throw new common_1.NotFoundException(`No appointments found.`);
        }
        appointment.isDeleted = true;
        await appointment.save();
    }
};
exports.AppointmentRepository = AppointmentRepository;
exports.AppointmentRepository = AppointmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AppointmentRepository);
//# sourceMappingURL=appointment-management.repository.js.map