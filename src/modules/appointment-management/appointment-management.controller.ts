import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AppointmentManagementService } from './appointment-management.service';
import { CreateAppointmentByAdminDto, CreateAppointmentByPatientDto } from './dto/create-appointment-patient.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/shared/decorator/get-user.decorator';
import { Users } from 'src/shared/entity/users.entity';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Role } from 'src/shared/enum/role.enum';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { PageQueryDto } from './dto/list-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';


@ApiTags('Appointment Management')
@Controller('appointment-management')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@ApiCookieAuth()
export class AppointmentManagementController {
  constructor(private readonly appointmentManagementService: AppointmentManagementService) { }

  @Post('/patient')
  @Roles(Role.PATIENT)
  @ApiOperation({ summary: "Book appointment by Patient" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 409, description: "Appointment Already Exist" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async createAppointmentByPatient(
    @Body() dto: CreateAppointmentByPatientDto, @GetUser() user: Users,
  ) {
    return this.appointmentManagementService.createAppointmentByPatient(dto, user.id);
  }


  @Post('/admin')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Book appointment by Admin" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 409, description: "Appointment Already Exist" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  createAppointByAdmin(@Body() dto: CreateAppointmentByAdminDto, @GetUser() user: Users) {
    return this.appointmentManagementService.createAppointByAdmin(dto, user.id);
  }


  @Get()
  @Roles(Role.ADMIN, Role.DOCTOR)
  @ApiOperation({ summary: "Get all appointments" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 409, description: "Appointment Already Exist" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async getAppointments(@Query() dto: PageQueryDto, @GetUser() user: Users) {
    return this.appointmentManagementService.getAppointments(dto, user);
  }

  @Patch(":id")
  @Roles(Role.ADMIN, Role.PATIENT, Role.DOCTOR)
  @ApiOperation({ summary: "Update appointment" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async updateAppointment(@Param('id') id: number, @Body() dto: UpdateAppointmentDto, @GetUser() user: Users) {
    return this.appointmentManagementService.updateAppointment(+id, dto, user);
  }


  @Delete(':id')
  @Roles(Role.ADMIN, Role.PATIENT)
  @ApiOperation({ summary: "Delete appointment" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async deleteAppointment(@Param('id') id: number, @GetUser() user: Users) {
    return this.appointmentManagementService.deleteAppointment(+id, user);
  }

}
