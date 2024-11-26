"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("typeorm");
const token_entity_1 = require("../../../shared/entity/token.entity");
const throw_exception_1 = require("../../../shared/utility/throw-exception");
const user_repository_1 = require("../../user/user.repository");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userRepository, configService, dataSource) {
        super({
            passReqToCallback: true,
            ignoreExpiration: true,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    const auth = request?.headers?.authorization?.slice(7);
                    if (!auth) {
                        return null;
                    }
                    return auth;
                }
            ]),
            secretOrKey: configService.get("jwt.secret")
        });
        this.userRepository = userRepository;
        this.dataSource = dataSource;
    }
    async validate(req, payload) {
        try {
            if (!payload) {
                throw new common_1.UnauthorizedException("Please login to continue.");
            }
            else if (payload.exp < Date.now() / 1000) {
                throw new common_1.UnauthorizedException("JWT token has been expired.");
            }
            const { id } = payload;
            const user = await this.userRepository.findOne({ where: { id: id, isActive: true } });
            if (!user) {
                throw new common_1.UnauthorizedException("Please login to continue.");
            }
            else if (!user.isActive) {
                throw new common_1.UnauthorizedException("Your account has been inactive. Kindly contact the Admin.");
            }
            const auth = req?.headers?.authorization.slice(7);
            if (!auth)
                throw new common_1.UnauthorizedException();
            const findToken = await this.dataSource.manager.findOne(token_entity_1.Token, {
                where: { accessToken: auth }
            });
            if (!findToken)
                throw new common_1.UnauthorizedException("Please login to continue.");
            return user;
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        config_1.ConfigService,
        typeorm_2.DataSource])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map