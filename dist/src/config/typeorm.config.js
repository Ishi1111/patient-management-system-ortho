"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
exports.typeOrmConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        type: "postgres",
        host: configService.get("db.host"),
        port: configService.get("db.port"),
        username: configService.get("db.username"),
        password: configService.get("db.password"),
        database: configService.get("db.database"),
        logging: configService.get("db.logging"),
        cache: configService.get("db.cache"),
        ssl: {
            rejectUnauthorized: false
        },
        synchronize: configService.get("db.synchronize"),
        entities: [__dirname + "/../**/entity/*.entity{.ts,.js}"]
    }),
    dataSourceFactory: async (options) => {
        const dataSource = await new typeorm_1.DataSource(options).initialize();
        return dataSource;
    }
};
//# sourceMappingURL=typeorm.config.js.map