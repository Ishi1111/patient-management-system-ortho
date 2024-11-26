import { Gender } from "src/shared/enum/gender.enum";
export declare class CreatePatientDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dob: Date;
    gender: Gender;
    contactNumber: string;
    address: string;
}
export declare class UpdatePatientDto extends CreatePatientDto {
}
