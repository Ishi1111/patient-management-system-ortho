import { PatientRecordManagementService } from './patient-record-management.service';
import { CreateConsultationDto } from './dto/create-patient-record.dto';
import { Users } from 'src/shared/entity/users.entity';
import { CreatePatientDto, UpdatePatientDto } from './dto/create-patient.dto';
import { PageQueryDto } from './dto/list-users.dto';
export declare class PatientRecordManagementController {
    private readonly patientRecordManagementService;
    constructor(patientRecordManagementService: PatientRecordManagementService);
    createPatient(dto: CreatePatientDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    getAllPatients(dto: PageQueryDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    getPatientDetails(id: string): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    updateAppointment(id: string, dto: UpdatePatientDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    createConsultation(dto: CreateConsultationDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    getRecord(appointmentId: number, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
}
