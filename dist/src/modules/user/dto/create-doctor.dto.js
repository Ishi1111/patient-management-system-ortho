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
exports.CreateDoctorDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const gender_enum_1 = require("../../../shared/enum/gender.enum");
class CreateDoctorDto {
}
exports.CreateDoctorDto = CreateDoctorDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.MinLength)(2),
    (0, swagger_1.ApiProperty)({
        description: `Enter first name`,
        example: `Jon`
    }),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.MinLength)(2),
    (0, swagger_1.ApiProperty)({
        description: `Enter last name`,
        example: `Doe`
    }),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "lastName", void 0);
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
], CreateDoctorDto.prototype, "email", void 0);
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
], CreateDoctorDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Enter dob.',
        example: '2000-04-25',
    }),
    __metadata("design:type", Date)
], CreateDoctorDto.prototype, "dob", void 0);
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
], CreateDoctorDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(12),
    (0, swagger_1.ApiProperty)({
        description: 'Enter phone number.',
        example: '+919567890009',
    }),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, swagger_1.ApiProperty)({
        description: 'Speciality of the doctor',
        example: 'Specialized in diagnosing, preventing, and treating dental and facial irregularities, particularly focusing on aligning teeth, jaws, and bite patterns'
    }),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "speciality", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, swagger_1.ApiProperty)({
        description: 'Orthodontists',
        example: 'Doctor of Dental Surgery (DDS)'
    }),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "degree", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Address of the doctor',
        example: '123 Main St'
    }),
    __metadata("design:type", String)
], CreateDoctorDto.prototype, "address", void 0);
//# sourceMappingURL=create-doctor.dto.js.map