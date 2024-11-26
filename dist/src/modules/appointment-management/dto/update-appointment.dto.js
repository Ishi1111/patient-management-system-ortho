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
exports.UpdateAppointmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const appointment_status_enum_1 = require("../../../shared/enum/appointment-status.enum");
class UpdateAppointmentDto {
}
exports.UpdateAppointmentDto = UpdateAppointmentDto;
__decorate([
    (0, class_validator_1.IsEnum)([appointment_status_enum_1.AppointmentStatus.CANCELED, appointment_status_enum_1.AppointmentStatus.COMPLETED, appointment_status_enum_1.AppointmentStatus.CONFIRMED], {
        message: (args) => {
            if (typeof args.value == "undefined" || args.value == "" || args.value == null) {
                return `Enter status(confirmed, canceled, completed)`;
            }
            else {
                return `Enter a valid status(confirmed, canceled, completed)`;
            }
        }
    }),
    (0, swagger_1.ApiProperty)({
        description: "Enter status (confirmed, canceled, completed)",
        example: appointment_status_enum_1.AppointmentStatus.CONFIRMED
    }),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "status", void 0);
//# sourceMappingURL=update-appointment.dto.js.map