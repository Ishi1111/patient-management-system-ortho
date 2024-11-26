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
exports.Appointments = void 0;
const typeorm_1 = require("typeorm");
const appointment_status_enum_1 = require("../enum/appointment-status.enum");
const users_entity_1 = require("./users.entity");
let Appointments = class Appointments extends typeorm_1.BaseEntity {
};
exports.Appointments = Appointments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'patient_id', nullable: false }),
    __metadata("design:type", String)
], Appointments.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'doctor_id', nullable: false }),
    __metadata("design:type", String)
], Appointments.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { name: "status", enum: appointment_status_enum_1.AppointmentStatus, nullable: false, comment: "pending,confirmed,canceled,   completed" }),
    __metadata("design:type", String)
], Appointments.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp with time zone",
        name: "date_time"
    }),
    __metadata("design:type", Date)
], Appointments.prototype, "dateTime", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", { name: "created_by", nullable: false }),
    __metadata("design:type", String)
], Appointments.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp with time zone",
        name: "created_at"
    }),
    __metadata("design:type", Date)
], Appointments.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", { name: "updated_by", nullable: true }),
    __metadata("design:type", String)
], Appointments.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp with time zone",
        name: "updated_at"
    }),
    __metadata("design:type", Date)
], Appointments.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'is_deleted', default: false, comment: "true=deleted, false=not-deleted" }),
    __metadata("design:type", Boolean)
], Appointments.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.appointmentPatient),
    (0, typeorm_1.JoinColumn)([{ name: "patient_id", referencedColumnName: "id" }]),
    __metadata("design:type", users_entity_1.Users)
], Appointments.prototype, "patients", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.appointmentDoctor),
    (0, typeorm_1.JoinColumn)([{ name: "doctor_id", referencedColumnName: "id" }]),
    __metadata("design:type", users_entity_1.Users)
], Appointments.prototype, "doctors", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users),
    (0, typeorm_1.JoinColumn)({ name: "created_by", referencedColumnName: "id" }),
    __metadata("design:type", users_entity_1.Users)
], Appointments.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users),
    (0, typeorm_1.JoinColumn)({ name: "updated_by", referencedColumnName: "id" }),
    __metadata("design:type", users_entity_1.Users)
], Appointments.prototype, "updatedByUser", void 0);
exports.Appointments = Appointments = __decorate([
    (0, typeorm_1.Index)("appointments_patient_id", ["patientId"], {}),
    (0, typeorm_1.Entity)('appointments')
], Appointments);
//# sourceMappingURL=appointments.entity.js.map