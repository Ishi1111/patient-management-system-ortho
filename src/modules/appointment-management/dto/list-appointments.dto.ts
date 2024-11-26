import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

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