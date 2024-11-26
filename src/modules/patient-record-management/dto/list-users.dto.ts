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
}