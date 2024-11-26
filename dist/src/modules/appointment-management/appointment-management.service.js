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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentManagementService = void 0;
const common_1 = require("@nestjs/common");
const throw_exception_1 = require("../../shared/utility/throw-exception");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_management_repository_1 = require("./appointment-management.repository");
let AppointmentManagementService = class AppointmentManagementService {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async createAppointmentByPatient(dto, patientId) {
        const data = await this.appointmentRepository.createAppointmentByPatient(dto, patientId);
        return {
            message: 'Appointment created successfully.',
            data
        };
    }
    async createAppointByAdmin(dto, adminId) {
        const data = await this.appointmentRepository.createAppointmentByAdmin(dto, adminId);
        return {
            message: 'Appointment created successfully.',
            data
        };
    }
    async getAppointments(dto, user) {
        try {
            const data = await this.appointmentRepository.getAppointments(dto, user);
            return {
                message: 'Appointments fetched successfully.',
                data
            };
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async updateAppointment(id, dto, user) {
        const data = await this.appointmentRepository.updateAppointment(id, dto, user);
        return {
            message: 'Appointment status updated successfully.',
            data
        };
    }
    async deleteAppointment(id, user) {
        await this.appointmentRepository.deleteAppointment(id, user);
        return {
            message: 'Appointment deleted successfully.',
        };
    }
};
exports.AppointmentManagementService = AppointmentManagementService;
exports.AppointmentManagementService = AppointmentManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_management_repository_1.AppointmentRepository)),
    __metadata("design:paramtypes", [appointment_management_repository_1.AppointmentRepository])
], AppointmentManagementService);
//# sourceMappingURL=appointment-management.service.js.map