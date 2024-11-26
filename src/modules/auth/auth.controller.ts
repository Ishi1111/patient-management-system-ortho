import { Controller, Post, Body, ValidationPipe, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/log-in.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppResponse } from 'src/shared/interface/app-response.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  @ApiOperation({ summary: "Register user" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 404, description: "Not found!" })
  @ApiResponse({ status: 409, description: "User Already Exist" })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  register(@Body(ValidationPipe) createUser: RegisterUserDto): Promise<{ message: string }> {
    return this.authService.register(createUser);
  }

  @Post("login")
  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: 200, description: "Api success" })
  @ApiResponse({ status: 406, description: "Not Acceptable error" })
  @ApiResponse({ status: 422, description: "Bad Request or API error message" })
  @ApiResponse({ status: 401, description: "Invalid Login credentials." })
  @ApiResponse({ status: 500, description: "Internal server error!" })
  signIn(
    @Res({ passthrough: true }) res: Response,
    @Body(ValidationPipe) authCredentialDto: LoginDto
  ): Promise<AppResponse> {
    return this.authService.loginUser(authCredentialDto, res);
  }


}
