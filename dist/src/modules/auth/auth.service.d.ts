import { RegisterUserDto } from "../auth/dto/create-user.dto";
import { LoginDto } from './dto/log-in.dto';
import { AppResponse } from 'src/shared/interface/app-response.interface';
import { UserRepository } from '../user/user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from "@nestjs/jwt";
import { Response } from 'express';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(userRepository: UserRepository, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterUserDto): Promise<{
        message: string;
    }>;
    loginUser(loginUser: LoginDto, res: any): Promise<AppResponse>;
    generateJWTToken(user: any, res: Response): {
        accessToken: string;
    };
    storeLoginToken(accessToken: any, userId: any): Promise<void>;
}
