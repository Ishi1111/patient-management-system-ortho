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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_repository_1 = require("../user/user.repository");
const config_1 = require("@nestjs/config");
const token_entity_1 = require("../../shared/entity/token.entity");
const throw_exception_1 = require("../../shared/utility/throw-exception");
const jwt_1 = require("@nestjs/jwt");
const common_functions_methods_1 = require("../../shared/utility/common-functions.methods");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        try {
            const { email, ...userData } = dto;
            await (0, common_functions_methods_1.checkEmailExists)(email);
            const salt = await bcrypt.genSalt();
            const user = this.userRepository.create({
                ...userData,
                email: email.toLowerCase(),
                salt
            });
            await this.userRepository.save(user);
            return { message: "User created successfully." };
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    async loginUser(loginUser, res) {
        try {
            const { email, password } = loginUser;
            const user = await this.userRepository.findOne({
                select: ['id', 'isActive', 'salt', 'password', 'firstName', 'email', 'lastName'],
                where: { email: email.toLocaleLowerCase() },
                order: { id: "DESC" }
            });
            if (!user) {
                throw new common_1.UnauthorizedException(`Please enter a registered email.`);
            }
            else if (!user.isActive) {
                throw new common_1.UnauthorizedException(`Your account has been inactive. Kindly contact the Admin.`);
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
            }
            else {
                throw new common_1.UnauthorizedException(`Invalid credentials!`);
            }
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
    generateJWTToken(user, res) {
        const payload = {
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
    async storeLoginToken(accessToken, userId) {
        try {
            const token = new token_entity_1.Token();
            token.accessToken = accessToken;
            token.userId = userId;
            await token.save();
        }
        catch (error) {
            (0, throw_exception_1.throwException)(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map