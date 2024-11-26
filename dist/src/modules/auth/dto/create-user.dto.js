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
exports.RegisterUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const gender_enum_1 = require("../../../shared/enum/gender.enum");
const role_enum_1 = require("../../../shared/enum/role.enum");
class RegisterUserDto {
}
exports.RegisterUserDto = RegisterUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.MinLength)(2),
    (0, swagger_1.ApiProperty)({
        description: `Enter first name`,
        example: `Jon`
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.MinLength)(2),
    (0, swagger_1.ApiProperty)({
        description: `Enter last name`,
        example: `Doe`
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, {
        message: (args) => {
            if (typeof args.value == "undefined" || args.value == "") {
                return `Enter email.`;
            }
            else {
                return `Enter a valid email.`;
            }
        }
    }),
    (0, swagger_1.ApiProperty)({
        description: `Enter email`,
        example: `jon.doe@gmail.com`
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: `Enter password`,
        example: `Test123@`
    }),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.MinLength)(8, { message: `Password is too short. It should be minimum 8 characters.` }),
    (0, class_validator_1.Matches)(/^(?!.*\s)(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/, {
        message: `Your password must be 8 characters long, should contain at least 1 uppercase, 1 lowercase, 1 numeric or special character.`
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.dob),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Enter dob.',
        example: '2000-04-25',
    }),
    __metadata("design:type", Date)
], RegisterUserDto.prototype, "dob", void 0);
__decorate([
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
    (0, swagger_1.ApiProperty)({
        description: "Enter role (patient, doctor, admin)",
        example: "patient"
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['male', 'female', 'other'], {
        message: (args) => {
            if (typeof args.value == "undefined" || args.value == "" || args.value == null) {
                return `Enter gender(male, female, other)`;
            }
            else {
                return `Enter a valid gender(male, female, other)`;
            }
        }
    }),
    (0, swagger_1.ApiProperty)({
        description: "Enter gender (male, female, other)",
        example: gender_enum_1.Gender.MALE
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "gender", void 0);
//# sourceMappingURL=create-user.dto.js.map