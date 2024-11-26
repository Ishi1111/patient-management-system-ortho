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
exports.Consultations = void 0;
const typeorm_1 = require("typeorm");
const appointments_entity_1 = require("./appointments.entity");
let Consultations = class Consultations extends typeorm_1.BaseEntity {
};
exports.Consultations = Consultations;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Consultations.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'appointment_id', nullable: false }),
    __metadata("design:type", Number)
], Consultations.prototype, "appointmentId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'diagnosis', nullable: false }),
    __metadata("design:type", String)
], Consultations.prototype, "diagnosis", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'treatment', nullable: true }),
    __metadata("design:type", String)
], Consultations.prototype, "treatment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => appointments_entity_1.Appointments),
    (0, typeorm_1.JoinColumn)([{ name: 'appointment_id', referencedColumnName: "id" }]),
    __metadata("design:type", appointments_entity_1.Appointments)
], Consultations.prototype, "appointment", void 0);
exports.Consultations = Consultations = __decorate([
    (0, typeorm_1.Index)("consultations_appointment_id", ["appointmentId"], {}),
    (0, typeorm_1.Entity)('consultations')
], Consultations);
//# sourceMappingURL=consultations.entity.js.map