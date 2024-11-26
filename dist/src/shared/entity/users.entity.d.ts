import { BaseEntity } from "typeorm";
import { Role } from "../enum/role.enum";
import { Gender } from "../enum/gender.enum";
import { Patients } from "./patients.entity";
import { Doctors } from "./doctors.entity";
import { Appointments } from "./appointments.entity";
export declare class Users extends BaseEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string;
    role: Role;
    gender: Gender;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    updatedByUser: Users;
    userUpdatedBy: Users[];
    patient: Patients[];
    doctor: Doctors[];
    appointmentCreatedBy: Appointments[];
    appointmentUpdatedBy: Appointments[];
    appointmentPatient: Appointments[];
    appointmentDoctor: Appointments[];
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
