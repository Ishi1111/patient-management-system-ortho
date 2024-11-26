import { Gender } from "src/shared/enum/gender.enum";
import { Role } from "src/shared/enum/role.enum";
export declare class RegisterUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dob: Date;
    role: Role;
    gender: Gender;
}
