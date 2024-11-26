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
exports.Patients = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let Patients = class Patients extends typeorm_1.BaseEntity {
};
exports.Patients = Patients;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Patients.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: false }),
    __metadata("design:type", String)
], Patients.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dob', nullable: false }),
    __metadata("design:type", Date)
], Patients.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_number', length: 15, nullable: false }),
    __metadata("design:type", String)
], Patients.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'address', nullable: false }),
    __metadata("design:type", String)
], Patients.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'medical_history', nullable: true }),
    __metadata("design:type", String)
], Patients.prototype, "medicalHistory", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => users_entity_1.Users),
    (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "id" }),
    __metadata("design:type", users_entity_1.Users)
], Patients.prototype, "user", void 0);
exports.Patients = Patients = __decorate([
    (0, typeorm_1.Index)("patients_user_id", ["userId"], {}),
    (0, typeorm_1.Entity)('patients')
], Patients);
//# sourceMappingURL=patients.entity.js.map