import { AppointmentManagementService } from './appointment-management.service';
import { CreateAppointmentByAdminDto, CreateAppointmentByPatientDto } from './dto/create-appointment-patient.dto';
import { Users } from 'src/shared/entity/users.entity';
import { PageQueryDto } from './dto/list-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentManagementController {
    private readonly appointmentManagementService;
    constructor(appointmentManagementService: AppointmentManagementService);
    createAppointmentByPatient(dto: CreateAppointmentByPatientDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    createAppointByAdmin(dto: CreateAppointmentByAdminDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    getAppointments(dto: PageQueryDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    updateAppointment(id: number, dto: UpdateAppointmentDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    deleteAppointment(id: number, user: Users): Promise<{
        message: string;
    }>;
}
