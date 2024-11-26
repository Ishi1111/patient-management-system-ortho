"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.SwaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle("Patient Management System Backend")
    .addBearerAuth()
    .addCookieAuth("auth")
    .setVersion("1.0")
    .build();
//# sourceMappingURL=swagger.config.js.map