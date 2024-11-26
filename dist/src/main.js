"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("./config/swagger.config");
const config_1 = require("@nestjs/config");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)({ contentSecurityPolicy: true }));
    const configService = app.get(config_1.ConfigService);
    const cookieSecret = configService.get("cookie_secret.secret");
    app.use(cookieParser(cookieSecret));
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.SwaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    const serverPort = configService.get("server.port");
    await app.listen(serverPort);
}
bootstrap();
//# sourceMappingURL=main.js.map