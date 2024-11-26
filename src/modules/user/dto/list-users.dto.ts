import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumberString, ValidateIf, ValidationArguments } from "class-validator";
import { Role } from "src/shared/enum/role.enum";

export class PageQueryDto {
   @IsNumberString({}, { message: "Offset contain only number" })
   @IsNotEmpty()
   @ApiProperty({
      description: "Enter offset",
      example: 0
   })
   offset: number;

   @IsNumberString({}, { message: "Limit contain only number" })
   @IsNotEmpty()
   @ApiProperty({
      description: "Enter limit",
      example: 10
   })
   limit: number;

   @ValidateIf(o => o.role)
   @IsEnum(['patient', 'doctor', 'admin'], {
      message: (args: ValidationArguments) => {
         if (typeof args.value == "undefined" || args.value == "" || args.value == null) {
            return `Enter role(patient, doctor, admin)`;
         } else {
            return `Enter a valid role(patient, doctor, admin)`;
         }
      }
   })
   @ApiPropertyOptional({
      description: "Enter role (patient, doctor, admin)",
      example: Role.PATIENT
   })
   role: Role;
}