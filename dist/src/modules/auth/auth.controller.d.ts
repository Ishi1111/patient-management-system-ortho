import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/log-in.dto';
import { AppResponse } from 'src/shared/interface/app-response.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUser: RegisterUserDto): Promise<{
        message: string;
    }>;
    signIn(res: Response, authCredentialDto: LoginDto): Promise<AppResponse>;
}
