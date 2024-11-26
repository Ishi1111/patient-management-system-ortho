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
exports.PageQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const role_enum_1 = require("../../../shared/enum/role.enum");
class PageQueryDto {
}
exports.PageQueryDto = PageQueryDto;
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: "Offset contain only number" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "Enter offset",
        example: 0
    }),
    __metadata("design:type", Number)
], PageQueryDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)({}, { message: "Limit contain only number" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "Enter limit",
        example: 10
    }),
    __metadata("design:type", Number)
], PageQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.role),
    (0, class_validator_1.IsEnum)(['patient', 'doctor', 'admin'], {
        message: (args) => {
            if (typeof args.value == "undefined" || args.value == "" || args.value == null) {
                return `Enter role(patient, doctor, admin)`;
            }
            else {
                return `Enter a valid role(patient, doctor, admin)`;
            }
        }
    }),
    (0, swagger_1.ApiPropertyOptional)({
        description: "Enter role (patient, doctor, admin)",
        example: role_enum_1.Role.PATIENT
    }),
    __metadata("design:type", String)
], PageQueryDto.prototype, "role", void 0);
//# sourceMappingURL=list-users.dto.js.map