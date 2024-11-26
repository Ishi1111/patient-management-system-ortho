import { BaseEntity } from "typeorm";
import { Users } from "./users.entity";
export declare class Token extends BaseEntity {
    id: number;
    userId: string;
    accessToken: string;
    user: Users;
    createdAt: Date;
    setUserId(): void;
}
