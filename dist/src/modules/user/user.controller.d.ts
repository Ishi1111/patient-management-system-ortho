import { PageQueryDto } from "./dto/list-users.dto";
import { Users } from "src/shared/entity/users.entity";
import { UserService } from "./user.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(dto: PageQueryDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
    createDoctor(dto: CreateDoctorDto, user: Users): Promise<import("../../shared/interface/app-response.interface").AppResponse<object | object[]>>;
}
