
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsUUID } from "class-validator";


export class CreateAppointmentByPatientDto {

   @IsUUID()
   @IsNotEmpty()
   @ApiProperty({
      description: "Enter doctor id",
      example: "123e4567-e89b-12d3-a456-426614174000"
   })
   doctorId: string;

   @IsDateString()
   @IsNotEmpty()
   @IsDateString()
   @ApiProperty({
      description: "Enter date and time",
      example: "2024-12-20T10:30:00"
   })
   dateTime: string;
}

export class CreateAppointmentByAdminDto extends CreateAppointmentByPatientDto {
   @IsUUID()
   @IsNotEmpty()
   @ApiProperty({
      description: "Enter patient id",
      example: "456e4567-e89b-12d3-a456-426614174000"
   })
   patientId: string;
}