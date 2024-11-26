import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { Token } from "../../../shared/entity/token.entity";
import { Request } from "express";
import { throwException } from "src/shared/utility/throw-exception";
import { UserRepository } from "../../user/user.repository";
import { Users } from "src/shared/entity/users.entity";
import { JwtPayload } from "src/shared/interface/jwt-payload.interface";

export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      @InjectRepository(UserRepository)
      private readonly userRepository: UserRepository,
      configService: ConfigService,
      private readonly dataSource: DataSource
   ) {
      super({
         passReqToCallback: true,
         ignoreExpiration: true,
         jwtFromRequest: ExtractJwt.fromExtractors([
            (request: Request) => {
               const auth = request?.headers?.authorization?.slice(7);
               if (!auth) {
                  return null;
               }
               return auth;
            }
         ]),
         secretOrKey: configService.get("jwt.secret")
      });
   }

   async validate(req: Request, payload: JwtPayload): Promise<Users> {
      try {
         if (!payload) {
            throw new UnauthorizedException("Please login to continue.");
         } else if (payload.exp < Date.now() / 1000) {
            throw new UnauthorizedException("JWT token has been expired.");
         }

         const { id } = payload;
         const user = await this.userRepository.findOne({ where: { id: id, isActive: true } });
         if (!user) {
            throw new UnauthorizedException("Please login to continue.");
         } else if (!user.isActive) {
            throw new UnauthorizedException("Your account has been inactive. Kindly contact the Admin.");
         }

         const auth = req?.headers?.authorization.slice(7);
         if (!auth) throw new UnauthorizedException();

         const findToken = await this.dataSource.manager.findOne(Token, {
            where:
               { accessToken: auth }
         });
         if (!findToken) throw new UnauthorizedException("Please login to continue.");

         return user;
      } catch (error) {
         throwException(error);
      }
   }


}
