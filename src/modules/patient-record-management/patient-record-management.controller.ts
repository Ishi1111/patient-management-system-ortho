import { Controller, Get, Post, Body, UseGuards, Param, Query, Patch } from '@nestjs/common';
import { PatientRecordManagementService } from './patient-record-management.service';
import { CreateConsultationDto } from './dto/create-patient-record.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { Role } from 'src/shared/enum/role.enum';
import { GetUser } from 'src/shared/decorator/get-user.decorator';
import { Users } from 'src/shared/entity/users.entity';
import { CreatePatientDto, UpdatePatientDto } from './dto/create-patient.dto';
import { PageQueryDto } from './dto/list-users.dto';


@ApiTags('Patient Record Management')
@Controller('patient-record-management')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@ApiCookieAuth()
export class PatientRecordManagementController {
  constructor(private readonly patientRecordManagementService: PatientRecordManagementService) { }

  @Post()
  @Roles(Role.DOCTOR, Role.ADMIN)
  @ApiOperation({ summary: "Add Patient" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 409, description: "Record Already Exist" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async createPatient(
    @Body() dto: CreatePatientDto, @GetUser() user: Users,
  ) {
    return this.patientRecordManagementService.createPatient(dto, user);
  }

  @Get()
  @Roles(Role.ADMIN, Role.DOCTOR, Role.PATIENT)
  @ApiOperation({ summary: "Get patients list" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async getAllPatients(@Query() dto: PageQueryDto, @GetUser() user: Users) {
    return this.patientRecordManagementService.getAllPatients(dto, user);
  }


  @Get(':id')
  @Roles(Role.ADMIN, Role.DOCTOR, Role.PATIENT)
  @ApiOperation({ summary: "Get patient details base on id" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async getPatientDetails(@Param('id') id: string) {
    return this.patientRecordManagementService.getPatientDetails(id);
  }

  @Patch(":id")
  @Roles(Role.ADMIN, Role.DOCTOR)
  @ApiOperation({ summary: "Update patient details" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async updateAppointment(@Param('id') id: string, @Body() dto: UpdatePatientDto, @GetUser() user: Users) {
    return this.patientRecordManagementService.updatePatient(id, dto, user);
  }


  @Post('/consultation')
  @Roles(Role.DOCTOR, Role.ADMIN)
  @ApiOperation({ summary: "Add consultation details" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 409, description: "Record Already Exist" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async createConsultation(@Body() dto: CreateConsultationDto, @GetUser() user: Users) {
    return this.patientRecordManagementService.createConsultation(dto, user);
  }

  @Get('appointment/:appointmentId')
  @Roles(Role.ADMIN, Role.DOCTOR, Role.PATIENT)
  @ApiOperation({ summary: "Get consultation details based on appointment id" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  async getRecord(@Param('appointmentId') appointmentId: number, @GetUser() user: Users) {
    return this.patientRecordManagementService.getRecord(appointmentId, user);
  }

}
