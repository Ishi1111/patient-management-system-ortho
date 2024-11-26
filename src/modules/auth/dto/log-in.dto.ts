import { IsNotEmpty, IsEmail, ValidationArguments } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {

   @IsEmail({}, {
      message: (args: ValidationArguments) => {
         if (typeof args.value == "undefined" || args.value == "") {
            return `Enter email.`;
         } else {
            return `Enter a valid email.`;
         }
      }
   })
   @ApiProperty({
      description: "Enter email",
      example: "jon.doe@gmail.com"
   })
   email: string;

   @IsNotEmpty()
   @ApiProperty({
      description: "Enter password",
      example: "Test123@"
   })
   password: string;
}
