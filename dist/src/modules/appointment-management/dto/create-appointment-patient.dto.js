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
exports.CreateAppointmentByAdminDto = exports.CreateAppointmentByPatientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAppointmentByPatientDto {
}
exports.CreateAppointmentByPatientDto = CreateAppointmentByPatientDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "Enter doctor id",
        example: "123e4567-e89b-12d3-a456-426614174000"
    }),
    __metadata("design:type", String)
], CreateAppointmentByPatientDto.prototype, "doctorId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        description: "Enter date and time",
        example: "2024-12-20T10:30:00"
    }),
    __metadata("design:type", String)
], CreateAppointmentByPatientDto.prototype, "dateTime", void 0);
class CreateAppointmentByAdminDto extends CreateAppointmentByPatientDto {
}
exports.CreateAppointmentByAdminDto = CreateAppointmentByAdminDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "Enter patient id",
        example: "456e4567-e89b-12d3-a456-426614174000"
    }),
    __metadata("design:type", String)
], CreateAppointmentByAdminDto.prototype, "patientId", void 0);
//# sourceMappingURL=create-appointment-patient.dto.js.map