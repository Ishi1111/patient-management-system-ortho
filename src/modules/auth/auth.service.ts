import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from "../auth/dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/log-in.dto';
import { AppResponse } from 'src/shared/interface/app-response.interface';
import { JwtPayload } from 'src/shared/interface/jwt-payload.interface';
import { UserRepository } from '../user/user.repository';
import { ConfigService } from '@nestjs/config';
import { Token } from 'src/shared/entity/token.entity';
import { throwException } from 'src/shared/utility/throw-exception';
import { JwtService } from "@nestjs/jwt";
import { Response } from 'express';
import { checkEmailExists } from 'src/shared/utility/common-functions.methods';

@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  /**
    * Registers a new user with the provided data.
    *
    * @param dto - The `RegisterUserDto` object containing the user registration data.
    * @returns An object with a success message.
    * @throws `ConflictException` if the email already exists.
    */
  async register(dto: RegisterUserDto): Promise<{ message: string }> {
    try {
      const { email, ...userData } = dto;

      //check email exists
      await checkEmailExists(email);

      const salt = await bcrypt.genSalt();

      const user = this.userRepository.create({
        ...userData,
        email: email.toLowerCase(),
        salt
      });
      await this.userRepository.save(user);

      return { message: "User created successfully." };

    } catch (error) {
      throwException(error);
    }
  }

  /**
   * Logs in a user with the provided email and password.
   *
   * @param loginUser - An object containing the email and password of the user.
   * @param res - The HTTP response object.
   * @returns An `AppResponse` object containing the user ID and access token.
   * @throws `UnauthorizedException` if the email is not registered, the account is deactivated, or the credentials are invalid.
   * @throws `Error` if any other exception occurs during the login process.
   */
  async loginUser(loginUser: LoginDto, res): Promise<AppResponse> {
    try {
      const { email, password } = loginUser;

      const user = await this.userRepository.findOne({
        select: ['id', 'isActive', 'salt', 'password', 'firstName', 'email', 'lastName'],
        where: { email: email.toLocaleLowerCase() },
        order: { id: "DESC" }
      });

      if (!user) {
        throw new UnauthorizedException(`Please enter a registered email.`);
      } else if (!user.isActive) {
        throw new UnauthorizedException(`Your account has been inactive. Kindly contact the Admin.`);
      }

      if (await user.validatePassword(password)) {
        const { accessToken } = this.generateJWTToken(user, res);

        await this.storeLoginToken(accessToken, user.id);

        return {
          data: {
            user_id: user.id,
            access_token: accessToken,
          },
          message: "Login successfully."
        };

      } else {
        throw new UnauthorizedException(`Invalid credentials!`)
      }
    } catch (error) {
      throwException(error);
    }
  }

  /**
   * Generates a JWT token for the provided user.
   *
   * @param user - The user object for which the JWT token should be generated.
   * @param res - The HTTP response object, used to set the JWT token as a cookie.
   * @returns An object containing the generated access token.
   */
  generateJWTToken(user, res: Response): { accessToken: string } {
    const payload: JwtPayload = {
      id: user.id,
      role: user.roleId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      date: Date.now().toString()
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get("jwt.secret"),
      expiresIn: this.configService.get("jwt.expire_in")
    });

    return { accessToken };
  }

  /**
   * Stores a login token for the provided user.
   *
   * @param accessToken - The access token to be stored.
   * @param userId - The ID of the user for whom the token is being stored.
   * @returns A Promise that resolves when the token has been successfully stored.
   */
  async storeLoginToken(accessToken, userId): Promise<void> {
    try {
      const token = new Token();
      token.accessToken = accessToken;
      token.userId = userId;
      await token.save();

    } catch (error) {
      throwException(error);
    }
  }



}
