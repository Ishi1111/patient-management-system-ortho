"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserExists = checkUserExists;
exports.checkNotPastDate = checkNotPastDate;
exports.checkAppointmentExists = checkAppointmentExists;
exports.checkAppointCreated = checkAppointCreated;
exports.checkEmailExists = checkEmailExists;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("../entity/users.entity");
const appointments_entity_1 = require("../entity/appointments.entity");
const appointment_status_enum_1 = require("../enum/appointment-status.enum");
const typeorm_1 = require("typeorm");
async function checkUserExists(userId, role) {
    const user = await users_entity_1.Users.findOne({
        where: {
            id: userId,
            isActive: true,
            role
        }
    });
    const userRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    if (!user)
        throw new common_1.NotFoundException(`${userRole} not found`);
    return user;
}
async function checkNotPastDate(fieldName, date) {
    const currentDate = new Date();
    if (new Date(date) < currentDate) {
        throw new common_1.BadRequestException(`${fieldName} cannot be a past date`);
    }
}
async function checkAppointmentExists(id) {
    const data = await appointments_entity_1.Appointments.findOne({
        where: {
            id,
            isDeleted: false,
        }
    });
    if (!data)
        throw new common_1.NotFoundException(`Appointment not found.`);
    return data;
}
async function checkAppointCreated(doctorId, patientId) {
    const data = await appointments_entity_1.Appointments.findOne({
        where: {
            doctorId,
            patientId,
            status: (0, typeorm_1.In)([appointment_status_enum_1.AppointmentStatus.PENDING, appointment_status_enum_1.AppointmentStatus.CONFIRMED]),
            isDeleted: true
        }
    });
    return data;
}
async function checkEmailExists(email) {
    const userExist = await users_entity_1.Users.findOne({
        where: {
            email: email.toLowerCase(),
            isActive: true,
        },
    });
    if (userExist)
        throw new common_1.ConflictException('Email already exists!');
}
//# sourceMappingURL=common-functions.methods.js.map