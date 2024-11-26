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
exports.Doctors = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let Doctors = class Doctors extends typeorm_1.BaseEntity {
};
exports.Doctors = Doctors;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Doctors.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { name: 'user_id', nullable: false }),
    __metadata("design:type", String)
], Doctors.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'phone_number', length: 15, nullable: false }),
    __metadata("design:type", String)
], Doctors.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'dob', nullable: false }),
    __metadata("design:type", Date)
], Doctors.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'degree', length: 150, nullable: false }),
    __metadata("design:type", String)
], Doctors.prototype, "degree", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'speciality', length: 100, nullable: false }),
    __metadata("design:type", String)
], Doctors.prototype, "speciality", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'address', nullable: true }),
    __metadata("design:type", String)
], Doctors.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => users_entity_1.Users),
    (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "id" }),
    __metadata("design:type", users_entity_1.Users)
], Doctors.prototype, "user", void 0);
exports.Doctors = Doctors = __decorate([
    (0, typeorm_1.Index)("doctors_user_id", ["userId"], {}),
    (0, typeorm_1.Entity)('doctors')
], Doctors);
//# sourceMappingURL=doctors.entity.js.map