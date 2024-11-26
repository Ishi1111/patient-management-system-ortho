import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateConsultationDto {

   @IsNumber()
   @IsNotEmpty()
   @ApiProperty({
      description: 'Appointment Id',
      example: 1
   })
   appointmentId: number;

   @IsString()
   @IsNotEmpty()
   @ApiProperty({
      description: 'Diagnosis',
      example: 'A mild concussion'
   })
   diagnosis: string;

   @IsString()
   @IsOptional()
   @ApiProperty({
      description: 'Treatment',
      example: 'Rest, Take painkillers & Stay hydrated.'
   })
   treatment?: string;
}
