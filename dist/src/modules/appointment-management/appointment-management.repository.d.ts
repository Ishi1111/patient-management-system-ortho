import { Appointments } from "src/shared/entity/appointments.entity";
import { Users } from "src/shared/entity/users.entity";
import { DataSource, Repository } from "typeorm";
import { PageQueryDto } from "./dto/list-appointments.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { CreateAppointmentByAdminDto, CreateAppointmentByPatientDto } from "./dto/create-appointment-patient.dto";
export declare class AppointmentRepository extends Repository<Appointments> {
    readonly dataSource: DataSource;
    constructor(dataSource: DataSource);
    createAppointmentByPatient(createAppointmentDto: CreateAppointmentByPatientDto, patientId: string): Promise<Appointments>;
    createAppointmentByAdmin(createAppointmentDto: CreateAppointmentByAdminDto, adminId: string): Promise<Appointments>;
    getAppointments(dto: PageQueryDto, user: Users): Promise<{
        appointments: Appointments[];
        totalResults: number;
    }>;
    updateAppointment(id: number, dto: UpdateAppointmentDto, user: Users): Promise<Appointments>;
    deleteAppointment(id: number, user: Users): Promise<void>;
}
