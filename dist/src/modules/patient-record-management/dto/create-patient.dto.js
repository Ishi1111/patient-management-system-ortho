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
exports.UpdatePatientDto = exports.CreatePatientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const gender_enum_1 = require("../../../shared/enum/gender.enum");
class CreatePatientDto {
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.MinLength)(2),
    (0, swagger_1.ApiProperty)({
        description: `Enter first name`,
        example: `Jon`
    }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.MinLength)(2),
    (0, swagger_1.ApiProperty)({
        description: `Enter last name`,
        example: `Doe`
    }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "lastName", void 0);
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
        description: `Enter Email`,
        example: `jon.doe@gmail.com`
    }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: `Enter Password`,
        example: `Test123@`
    }),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.MinLength)(8, { message: `Password is too short. It should be minimum 8 characters.` }),
    (0, class_validator_1.Matches)(/^(?!.*\s)(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/, {
        message: `Your password must be 8 characters long, should contain at least 1 uppercase, 1 lowercase, 1 numeric or special character.`
    }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Enter dob.',
        example: '2000-04-25',
    }),
    __metadata("design:type", Date)
], CreatePatientDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsEnum)([gender_enum_1.Gender.MALE, gender_enum_1.Gender.FEMALE, gender_enum_1.Gender.OTHER], {
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
], CreatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(12),
    (0, swagger_1.ApiProperty)({
        description: 'Enter contact number.',
        example: '+919567890009',
    }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "contactNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Enter address',
        example: '456 Residency Road, Pune, Maharashtra 411001, India',
    }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "address", void 0);
class UpdatePatientDto extends CreatePatientDto {
}
exports.UpdatePatientDto = UpdatePatientDto;
//# sourceMappingURL=create-patient.dto.js.map