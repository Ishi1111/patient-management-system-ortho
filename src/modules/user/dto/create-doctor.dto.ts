import { IsNotEmpty, IsString, IsEmail, Length, Matches, IsDate, IsOptional, ValidateIf, IsEnum, IsDateString, MaxLength, MinLength, ValidationArguments } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/shared/enum/gender.enum';

export class CreateDoctorDto {

   @IsNotEmpty()
   @MaxLength(30)
   @MinLength(2)
   @ApiProperty({
      description: `Enter first name`,
      example: `Jon`
   })
   firstName: string;

   @IsNotEmpty()
   @MaxLength(30)
   @MinLength(2)
   @ApiProperty({
      description: `Enter last name`,
      example: `Doe`
   })
   lastName: string;

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
      description: `Enter Email`,
      example: `jon.doe@gmail.com`
   })
   email: string;

   @IsNotEmpty()
   @ApiProperty({
      description: `Enter Password`,
      example: `Test123@`
   })
   @MaxLength(20)
   @MinLength(8, { message: `Password is too short. It should be minimum 8 characters.` })
   @Matches(/^(?!.*\s)(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z]).{8,20}$/, {
      message: `Your password must be 8 characters long, should contain at least 1 uppercase, 1 lowercase, 1 numeric or special character.`
   })
   password: string;

   @IsDateString()
   @ApiProperty({
      description: 'Enter dob.',
      example: '2000-04-25',
   })
   dob: Date;

   @IsEnum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
      message: (args: ValidationArguments) => {
         if (typeof args.value == "undefined" || args.value == "" || args.value == null) {
            return `Enter gender(male, female, other)`;
         } else {
            return `Enter a valid gender(male, female, other)`;
         }
      }
   })
   @ApiProperty({
      description: "Enter gender (male, female, other)",
      example: Gender.MALE
   })
   gender: Gender;

   @IsNotEmpty()
   @MaxLength(12)
   @ApiProperty({
      description: 'Enter phone number.',
      example: '+919567890009',
   })
   phoneNumber: string;

   @IsNotEmpty()
   @IsString()
   @Length(1, 100)
   @ApiProperty({
      description: 'Speciality of the doctor',
      example: 'Specialized in diagnosing, preventing, and treating dental and facial irregularities, particularly focusing on aligning teeth, jaws, and bite patterns'
   })
   speciality: string;

   @IsNotEmpty()
   @IsString()
   @Length(1, 100)
   @ApiProperty({
      description: 'Orthodontists',
      example: 'Doctor of Dental Surgery (DDS)'
   })
   degree: string;

   @IsOptional()
   @IsString()
   @ApiProperty({
      description: 'Address of the doctor',
      example: '123 Main St'
   })
   address?: string;
}
