import { AppResponse } from 'src/shared/interface/app-response.interface';
import { Users } from 'src/shared/entity/users.entity';
import { PatientRecordsRepository } from './patient-record-management.repository';
import { CreateConsultationDto } from './dto/create-patient-record.dto';
import { CreatePatientDto, UpdatePatientDto } from './dto/create-patient.dto';
import { PageQueryDto } from './dto/list-users.dto';
export declare class PatientRecordManagementService {
    private readonly patientRecordsRepository;
    constructor(patientRecordsRepository: PatientRecordsRepository);
    createPatient(dto: CreatePatientDto, user: Users): Promise<AppResponse>;
    updatePatient(id: any, dto: UpdatePatientDto, user: Users): Promise<AppResponse>;
    getPatientDetails(id: string): Promise<AppResponse>;
    getAllPatients(dto: PageQueryDto, user: Users): Promise<AppResponse>;
    createConsultation(dto: CreateConsultationDto, user: Users): Promise<AppResponse>;
    getRecord(appointmentId: number, user: Users): Promise<AppResponse>;
}
