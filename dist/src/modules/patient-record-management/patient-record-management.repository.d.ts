import { Users } from "src/shared/entity/users.entity";
import { DataSource, Repository } from "typeorm";
import { Consultations } from "src/shared/entity/consultations.entity";
import { CreateConsultationDto } from "./dto/create-patient-record.dto";
import { CreatePatientDto, UpdatePatientDto } from "./dto/create-patient.dto";
import { PageQueryDto } from "./dto/list-users.dto";
export declare class PatientRecordsRepository extends Repository<Consultations> {
    readonly dataSource: DataSource;
    constructor(dataSource: DataSource);
    createPatient(createPatientDto: CreatePatientDto, user: Users): Promise<Users>;
    getAllPatients(dto: PageQueryDto, user: Users): Promise<{
        patients: Users[];
        totalResults: number;
    }>;
    getPatientDetails(id: string): Promise<Users>;
    updatePatient(id: string, updatePatientDto: UpdatePatientDto, user: Users): Promise<Users>;
    createConsultation(dto: CreateConsultationDto, user: Users): Promise<Consultations>;
    getRecord(appointmentId: number, user: Users): Promise<Consultations>;
}
