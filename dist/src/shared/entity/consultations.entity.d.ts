import { BaseEntity } from "typeorm";
import { Appointments } from "./appointments.entity";
export declare class Consultations extends BaseEntity {
    id: number;
    appointmentId: number;
    diagnosis: string;
    treatment: string;
    appointment: Appointments;
}
