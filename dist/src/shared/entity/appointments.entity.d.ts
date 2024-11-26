import { BaseEntity } from 'typeorm';
import { AppointmentStatus } from '../enum/appointment-status.enum';
import { Users } from './users.entity';
export declare class Appointments extends BaseEntity {
    id: number;
    patientId: string;
    doctorId: string;
    status: AppointmentStatus;
    dateTime: Date;
    createdBy: string | null;
    createdAt: Date;
    updatedBy: string | null;
    updatedAt: Date;
    isDeleted: boolean;
    patients: Users;
    doctors: Users;
    createdByUser: Users;
    updatedByUser: Users;
}
