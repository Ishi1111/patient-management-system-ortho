import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import { Users } from "../entity/users.entity";
import { Role } from "../enum/role.enum";
import { Appointments } from "../entity/appointments.entity";
import { AppointmentStatus } from "../enum/appointment-status.enum";
import { In } from "typeorm";


/* check if user exists */
async function checkUserExists(userId: string, role: Role) {
   const user = await Users.findOne({
      where: {
         id: userId,
         isActive: true,
         role
      }
   })
   const userRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
   if (!user) throw new NotFoundException(`${userRole} not found`);
   return user;
}


/* Check if given date is not a past date */
async function checkNotPastDate(fieldName: string, date: string) {
   const currentDate = new Date();

   if (new Date(date) < currentDate) {
      throw new BadRequestException(`${fieldName} cannot be a past date`);
   }

}

/* check if appointment exist*/
async function checkAppointmentExists(id: number) {
   const data = await Appointments.findOne({
      where: {
         id,
         isDeleted: false,
      }
   })

   if (!data) throw new NotFoundException(`Appointment not found.`);
   return data;
}

/* check if appointment already created */
async function checkAppointCreated(doctorId: string, patientId: string) {
   const data = await Appointments.findOne({
      where: {
         doctorId,
         patientId,
         status: In([AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED]),
         isDeleted: true
      }
   })
   return data;
}

/* check if email already exists */
async function checkEmailExists(email: string) {
   const userExist = await Users.findOne({
      where: {
         email: email.toLowerCase(),
         isActive: true,
      },
   });
   if (userExist) throw new ConflictException('Email already exists!');

}


export { checkUserExists, checkNotPastDate, checkAppointmentExists, checkAppointCreated, checkEmailExists }
