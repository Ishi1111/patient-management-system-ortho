import { Users } from "src/shared/entity/users.entity";
import { DataSource, Repository } from "typeorm";
import { PageQueryDto } from "./dto/list-users.dto";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
export declare class UserRepository extends Repository<Users> {
    readonly dataSource: DataSource;
    constructor(dataSource: DataSource);
    getUsers(dto: PageQueryDto, user: Users): Promise<{
        users: Users[];
        totalResults: number;
    }>;
    createDoctor(dto: CreateDoctorDto, user: Users): Promise<Users>;
    getDoctorDetails(id: string): Promise<Users>;
}
