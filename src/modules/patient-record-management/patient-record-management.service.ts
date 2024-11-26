import { Injectable } from '@nestjs/common';
import { throwException } from 'src/shared/utility/throw-exception';
import { AppResponse } from 'src/shared/interface/app-response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/shared/entity/users.entity';
import { PatientRecordsRepository } from './patient-record-management.repository';
import { CreateConsultationDto } from './dto/create-patient-record.dto';
import { CreatePatientDto, UpdatePatientDto } from './dto/create-patient.dto';
import { PageQueryDto } from './dto/list-users.dto';

@Injectable()
export class PatientRecordManagementService {

  constructor(
    @InjectRepository(PatientRecordsRepository)
    private readonly patientRecordsRepository: PatientRecordsRepository,
  ) { }

  async createPatient(dto: CreatePatientDto, user: Users): Promise<AppResponse> {
    const data = await this.patientRecordsRepository.createPatient(dto, user);
    return {
      message: 'Patient created successfully.',
      data
    }
  }

  async updatePatient(id, dto: UpdatePatientDto, user: Users): Promise<AppResponse> {
    const data = await this.patientRecordsRepository.updatePatient(id, dto, user);
    return {
      message: 'Patient updated successfully.',
      data
    }
  }

  async getPatientDetails(id: string): Promise<AppResponse> {
    const data = await this.patientRecordsRepository.getPatientDetails(id);
    return {
      message: 'Patient details fetched successfully.',
      data
    }
  }

  async getAllPatients(dto: PageQueryDto, user: Users): Promise<AppResponse> {
    const data = await this.patientRecordsRepository.getAllPatients(dto, user);
    return {
      message: 'Patients fetched successfully.',
      data
    }
  }

  async createConsultation(dto: CreateConsultationDto, user: Users): Promise<AppResponse> {
    const data = await this.patientRecordsRepository.createConsultation(dto, user);
    return {
      message: 'Consultation record created successfully.',
      data
    }
  }

  async getRecord(appointmentId: number, user: Users): Promise<AppResponse> {
    try {
      const data = await this.patientRecordsRepository.getRecord(appointmentId, user);

      return {
        message: 'Consultation record fetched successfully.',
        data
      }
    } catch (error) {
      throwException(error)
    }
  }

}
