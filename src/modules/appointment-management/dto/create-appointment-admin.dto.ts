// import { ApiProperty } from "@nestjs/swagger";
// import { IsDateString, IsEnum, IsNotEmpty, IsUUID, ValidationArguments } from "class-validator";
// import { AppointmentStatus } from "src/shared/enum/appointment-status.enum";


// export class CreateAppointmentByAdminDto {
//    @IsUUID()
//    @IsNotEmpty()
//    @ApiProperty({
//       description: "Enter doctor id",
//       example: "123e4567-e89b-12d3-a456-426614174000"
//    })
//    doctorId: string;

//    @IsUUID()
//    @IsNotEmpty()
//    @ApiProperty({
//       description: "Enter patient id",
//       example: "456e4567-e89b-12d3-a456-426614174000"
//    })
//    patientId: string;

//    @IsDateString()
//    @IsNotEmpty()
//    @IsDateString()
//    @ApiProperty({
//       description: "Enter date and time",
//       example: "2024-12-20T10:30:00"
//    })
//    dateTime: string;

//    @IsEnum(['confirmed', 'pending'], {
//       message: (args: ValidationArguments) => {
//          if (typeof args.value == "undefined" || args.value == "" || args.value == null) {
//             return `Enter status(confirmed, pending)`;
//          } else {
//             return `Enter a valid status(confirmed, pending)`;
//          }
//       }
//    })
//    @ApiProperty({
//       description: "Enter status (confirmed, pending)",
//       example: AppointmentStatus.CONFIRMED
//    })
//    status: AppointmentStatus;
// }

