"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_decode_1 = require("jwt-decode");
let JwtMiddleware = class JwtMiddleware {
    async use(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
            const token = authHeader.split(' ')[1];
            try {
                const decoded = (0, jwt_decode_1.jwtDecode)(token);
                req.user = decoded;
                next();
            }
            catch (error) {
                res.status(401).json({ message: 'Invalid token' });
            }
        }
        else {
            res.status(401).json({ message: 'Token not provided' });
        }
    }
};
exports.JwtMiddleware = JwtMiddleware;
exports.JwtMiddleware = JwtMiddleware = __decorate([
    (0, common_1.Injectable)()
], JwtMiddleware);
//# sourceMappingURL=jwt.middleware.js.map