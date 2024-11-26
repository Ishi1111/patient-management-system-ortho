import { Module } from '@nestjs/common';
import { AppointmentManagementService } from './appointment-management.service';
import { AppointmentManagementController } from './appointment-management.controller';
import { AppointmentRepository } from './appointment-management.repository';

@Module({
  controllers: [AppointmentManagementController],
  providers: [AppointmentManagementService, AppointmentRepository],
})
export class AppointmentManagementModule { }
