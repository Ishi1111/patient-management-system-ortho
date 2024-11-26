import { Module } from '@nestjs/common';
import { PatientRecordManagementService } from './patient-record-management.service';
import { PatientRecordManagementController } from './patient-record-management.controller';
import { PatientRecordsRepository } from './patient-record-management.repository';

@Module({
  controllers: [PatientRecordManagementController],
  providers: [PatientRecordManagementService, PatientRecordsRepository],
})
export class PatientRecordManagementModule { }
