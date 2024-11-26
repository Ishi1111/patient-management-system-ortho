import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, ValidationArguments } from "class-validator";
import { AppointmentStatus } from "src/shared/enum/appointment-status.enum";

export class UpdateAppointmentDto {


   @IsEnum([AppointmentStatus.CANCELED, AppointmentStatus.COMPLETED, AppointmentStatus.CONFIRMED], {
      message: (args: ValidationArguments) => {
         if (typeof args.value == "undefined" || args.value == "" || args.value == null) {
            return `Enter status(confirmed, canceled, completed)`;
         } else {
            return `Enter a valid status(confirmed, canceled, completed)`;
         }
      }
   })
   @ApiProperty({
      description: "Enter status (confirmed, canceled, completed)",
      example: AppointmentStatus.CONFIRMED
   })
   status: AppointmentStatus;
}
