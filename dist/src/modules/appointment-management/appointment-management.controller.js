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
exports.AppointmentManagementController = void 0;
const common_1 = require("@nestjs/common");
const appointment_management_service_1 = require("./appointment-management.service");
const create_appointment_patient_dto_1 = require("./dto/create-appointment-patient.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../../shared/decorator/get-user.decorator");
const users_entity_1 = require("../../shared/entity/users.entity");
const roles_guard_1 = require("../../shared/guard/roles.guard");
const role_enum_1 = require("../../shared/enum/role.enum");
const roles_decorator_1 = require("../../shared/decorator/roles.decorator");
const list_appointments_dto_1 = require("./dto/list-appointments.dto");
const update_appointment_dto_1 = require("./dto/update-appointment.dto");
let AppointmentManagementController = class AppointmentManagementController {
    constructor(appointmentManagementService) {
        this.appointmentManagementService = appointmentManagementService;
    }
    async createAppointmentByPatient(dto, user) {
        return this.appointmentManagementService.createAppointmentByPatient(dto, user.id);
    }
    createAppointByAdmin(dto, user) {
        return this.appointmentManagementService.createAppointByAdmin(dto, user.id);
    }
    async getAppointments(dto, user) {
        return this.appointmentManagementService.getAppointments(dto, user);
    }
    async updateAppointment(id, dto, user) {
        return this.appointmentManagementService.updateAppointment(+id, dto, user);
    }
    async deleteAppointment(id, user) {
        return this.appointmentManagementService.deleteAppointment(+id, user);
    }
};
exports.AppointmentManagementController = AppointmentManagementController;
__decorate([
    (0, common_1.Post)('/patient'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.PATIENT),
    (0, swagger_1.ApiOperation)({ summary: "Book appointment by Patient" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "Appointment Already Exist" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_patient_dto_1.CreateAppointmentByPatientDto, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], AppointmentManagementController.prototype, "createAppointmentByPatient", null);
__decorate([
    (0, common_1.Post)('/admin'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Book appointment by Admin" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "Appointment Already Exist" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_patient_dto_1.CreateAppointmentByAdminDto, users_entity_1.Users]),
    __metadata("design:returntype", void 0)
], AppointmentManagementController.prototype, "createAppointByAdmin", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR),
    (0, swagger_1.ApiOperation)({ summary: "Get all appointments" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "Appointment Already Exist" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_appointments_dto_1.PageQueryDto, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], AppointmentManagementController.prototype, "getAppointments", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.PATIENT, role_enum_1.Role.DOCTOR),
    (0, swagger_1.ApiOperation)({ summary: "Update appointment" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_appointment_dto_1.UpdateAppointmentDto, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], AppointmentManagementController.prototype, "updateAppointment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.PATIENT),
    (0, swagger_1.ApiOperation)({ summary: "Delete appointment" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], AppointmentManagementController.prototype, "deleteAppointment", null);
exports.AppointmentManagementController = AppointmentManagementController = __decorate([
    (0, swagger_1.ApiTags)('Appointment Management'),
    (0, common_1.Controller)('appointment-management'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiCookieAuth)(),
    __metadata("design:paramtypes", [appointment_management_service_1.AppointmentManagementService])
], AppointmentManagementController);
//# sourceMappingURL=appointment-management.controller.js.map