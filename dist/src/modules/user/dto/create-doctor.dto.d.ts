import { Gender } from 'src/shared/enum/gender.enum';
export declare class CreateDoctorDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dob: Date;
    gender: Gender;
    phoneNumber: string;
    speciality: string;
    degree: string;
    address?: string;
}
