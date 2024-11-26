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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../enum/role.enum");
const gender_enum_1 = require("../enum/gender.enum");
const patients_entity_1 = require("./patients.entity");
const doctors_entity_1 = require("./doctors.entity");
const bcrypt = require("bcrypt");
const appointments_entity_1 = require("./appointments.entity");
const class_transformer_1 = require("class-transformer");
let Users = class Users extends typeorm_1.BaseEntity {
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, this.salt);
        }
    }
    async validatePassword(password) {
        const isValid = await bcrypt.compare(password, this.password);
        return isValid;
    }
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "first_name", length: 30, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "last_name", length: 30, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email", length: 100, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "password", length: 255, nullable: false }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "salt", length: 50, nullable: false }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Users.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { name: "role", enum: role_enum_1.Role, nullable: false, comment: "admin,doctor,patient" }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { name: "gender", enum: gender_enum_1.Gender, nullable: false, comment: "male,female,other" }),
    __metadata("design:type", String)
], Users.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'is_active', default: true, comment: "true=active, false=inactive" }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp with time zone",
        name: "created_at"
    }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp with time zone",
        name: "updated_at"
    }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users, (p) => p.userUpdatedBy),
    (0, typeorm_1.JoinColumn)([{ name: "updated_by", referencedColumnName: "id" }]),
    __metadata("design:type", Users)
], Users.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Users, (u) => u.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "userUpdatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => patients_entity_1.Patients, (u) => u.user),
    __metadata("design:type", Array)
], Users.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => doctors_entity_1.Doctors, (u) => u.user),
    __metadata("design:type", Array)
], Users.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.Appointments, (u) => u.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "appointmentCreatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.Appointments, (u) => u.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "appointmentUpdatedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.Appointments, (appointment) => appointment.patients),
    __metadata("design:type", Array)
], Users.prototype, "appointmentPatient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.Appointments, (appointment) => appointment.doctors),
    __metadata("design:type", Array)
], Users.prototype, "appointmentDoctor", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Users.prototype, "hashPassword", null);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
//# sourceMappingURL=users.entity.js.map