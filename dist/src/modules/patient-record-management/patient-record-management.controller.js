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
exports.PatientRecordManagementController = void 0;
const common_1 = require("@nestjs/common");
const patient_record_management_service_1 = require("./patient-record-management.service");
const create_patient_record_dto_1 = require("./dto/create-patient-record.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../shared/guard/roles.guard");
const roles_decorator_1 = require("../../shared/decorator/roles.decorator");
const role_enum_1 = require("../../shared/enum/role.enum");
const get_user_decorator_1 = require("../../shared/decorator/get-user.decorator");
const users_entity_1 = require("../../shared/entity/users.entity");
const create_patient_dto_1 = require("./dto/create-patient.dto");
const list_users_dto_1 = require("./dto/list-users.dto");
let PatientRecordManagementController = class PatientRecordManagementController {
    constructor(patientRecordManagementService) {
        this.patientRecordManagementService = patientRecordManagementService;
    }
    async createPatient(dto, user) {
        return this.patientRecordManagementService.createPatient(dto, user);
    }
    async getAllPatients(dto, user) {
        return this.patientRecordManagementService.getAllPatients(dto, user);
    }
    async getPatientDetails(id) {
        return this.patientRecordManagementService.getPatientDetails(id);
    }
    async updateAppointment(id, dto, user) {
        return this.patientRecordManagementService.updatePatient(id, dto, user);
    }
    async createConsultation(dto, user) {
        return this.patientRecordManagementService.createConsultation(dto, user);
    }
    async getRecord(appointmentId, user) {
        return this.patientRecordManagementService.getRecord(appointmentId, user);
    }
};
exports.PatientRecordManagementController = PatientRecordManagementController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.DOCTOR, role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Add Patient" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "Record Already Exist" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], PatientRecordManagementController.prototype, "createPatient", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR, role_enum_1.Role.PATIENT),
    (0, swagger_1.ApiOperation)({ summary: "Get patients list" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_users_dto_1.PageQueryDto, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], PatientRecordManagementController.prototype, "getAllPatients", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR, role_enum_1.Role.PATIENT),
    (0, swagger_1.ApiOperation)({ summary: "Get patient details base on id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientRecordManagementController.prototype, "getPatientDetails", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR),
    (0, swagger_1.ApiOperation)({ summary: "Update patient details" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_patient_dto_1.UpdatePatientDto, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], PatientRecordManagementController.prototype, "updateAppointment", null);
__decorate([
    (0, common_1.Post)('/consultation'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.DOCTOR, role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: "Add consultation details" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "Record Already Exist" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_record_dto_1.CreateConsultationDto, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], PatientRecordManagementController.prototype, "createConsultation", null);
__decorate([
    (0, common_1.Get)('appointment/:appointmentId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.DOCTOR, role_enum_1.Role.PATIENT),
    (0, swagger_1.ApiOperation)({ summary: "Get consultation details based on appointment id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Api success" }),
    (0, swagger_1.ApiResponse)({ status: 422, description: "Bad Request or API error message" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Not found!" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: "Internal server error!" }),
    __param(0, (0, common_1.Param)('appointmentId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], PatientRecordManagementController.prototype, "getRecord", null);
exports.PatientRecordManagementController = PatientRecordManagementController = __decorate([
    (0, swagger_1.ApiTags)('Patient Record Management'),
    (0, common_1.Controller)('patient-record-management'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiCookieAuth)(),
    __metadata("design:paramtypes", [patient_record_management_service_1.PatientRecordManagementService])
], PatientRecordManagementController);
//# sourceMappingURL=patient-record-management.controller.js.map