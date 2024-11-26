import { Injectable } from '@nestjs/common';
import { throwException } from 'src/shared/utility/throw-exception';
import { AppResponse } from 'src/shared/interface/app-response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment-management.repository';
import { Users } from 'src/shared/entity/users.entity';
import { PageQueryDto } from './dto/list-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CreateAppointmentByAdminDto, CreateAppointmentByPatientDto } from './dto/create-appointment-patient.dto';

@Injectable()
export class AppointmentManagementService {

  constructor(
    @InjectRepository(AppointmentRepository)
    private readonly appointmentRepository: AppointmentRepository,
  ) { }

  async createAppointmentByPatient(dto: CreateAppointmentByPatientDto, patientId: string): Promise<AppResponse> {
    const data = await this.appointmentRepository.createAppointmentByPatient(dto, patientId);
    return {
      message: 'Appointment created successfully.',
      data
    }
  }

  async createAppointByAdmin(dto: CreateAppointmentByAdminDto, adminId: string): Promise<AppResponse> {
    const data = await this.appointmentRepository.createAppointmentByAdmin(dto, adminId);
    return {
      message: 'Appointment created successfully.',
      data
    }
  }

  async getAppointments(dto: PageQueryDto, user: Users): Promise<AppResponse> {
    try {
      const data = await this.appointmentRepository.getAppointments(dto, user);

      return {
        message: 'Appointments fetched successfully.',
        data
      }
    } catch (error) {
      throwException(error)
    }
  }

  async updateAppointment(id: number, dto: UpdateAppointmentDto, user: Users): Promise<AppResponse> {
    const data = await this.appointmentRepository.updateAppointment(id, dto, user);

    return {
      message: 'Appointment status updated successfully.',
      data
    }
  }

  async deleteAppointment(id: number, user: Users): Promise<{ message: string }> {
    await this.appointmentRepository.deleteAppointment(id, user);

    return {
      message: 'Appointment deleted successfully.',

    }
  }

}
