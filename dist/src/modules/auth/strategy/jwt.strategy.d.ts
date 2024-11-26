import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { Request } from "express";
import { UserRepository } from "../../user/user.repository";
import { Users } from "src/shared/entity/users.entity";
import { JwtPayload } from "src/shared/interface/jwt-payload.interface";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    private readonly dataSource;
    constructor(userRepository: UserRepository, configService: ConfigService, dataSource: DataSource);
    validate(req: Request, payload: JwtPayload): Promise<Users>;
}
export {};
