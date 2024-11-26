import { AppResponse } from 'src/shared/interface/app-response.interface';
import { AppointmentRepository } from './appointment-management.repository';
import { Users } from 'src/shared/entity/users.entity';
import { PageQueryDto } from './dto/list-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CreateAppointmentByAdminDto, CreateAppointmentByPatientDto } from './dto/create-appointment-patient.dto';
export declare class AppointmentManagementService {
    private readonly appointmentRepository;
    constructor(appointmentRepository: AppointmentRepository);
    createAppointmentByPatient(dto: CreateAppointmentByPatientDto, patientId: string): Promise<AppResponse>;
    createAppointByAdmin(dto: CreateAppointmentByAdminDto, adminId: string): Promise<AppResponse>;
    getAppointments(dto: PageQueryDto, user: Users): Promise<AppResponse>;
    updateAppointment(id: number, dto: UpdateAppointmentDto, user: Users): Promise<AppResponse>;
    deleteAppointment(id: number, user: Users): Promise<{
        message: string;
    }>;
}
