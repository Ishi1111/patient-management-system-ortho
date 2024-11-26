import { BaseEntity } from "typeorm";
import { Users } from "./users.entity";
export declare class Patients extends BaseEntity {
    id: string;
    userId: string;
    dob: Date;
    contactNumber: string;
    address: string;
    medicalHistory: string;
    user: Users;
}
