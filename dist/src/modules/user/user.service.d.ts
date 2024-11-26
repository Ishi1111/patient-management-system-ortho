import { UserRepository } from "./user.repository";
import { PageQueryDto } from "./dto/list-users.dto";
import { Users } from "src/shared/entity/users.entity";
import { AppResponse } from "src/shared/interface/app-response.interface";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getUsers(dto: PageQueryDto, user: Users): Promise<AppResponse>;
    createDoctor(dto: CreateDoctorDto, user: Users): Promise<AppResponse>;
}
