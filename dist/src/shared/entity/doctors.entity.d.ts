import { BaseEntity } from "typeorm";
import { Users } from "./users.entity";
export declare class Doctors extends BaseEntity {
    id: string;
    userId: string;
    phoneNumber: string;
    dob: Date;
    degree: string;
    speciality: string;
    address: string | null;
    user: Users;
}
