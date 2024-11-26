"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const configuration = () => ({
    server: {
        env: process.env.NODE_ENV,
        port: process.env.SERVER_PORT
    },
    db: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        synchronize: process.env.DATABASE_SYNC == "true",
        logging: process.env.DATABASE_LOG == "true",
        cache: process.env.DATABASE_CACHE == "true"
    },
    jwt: {
        expire_in: parseInt(process.env.JWT_EXPIRE_IN),
        secret: process.env.JWT_SECRET_KEY
    },
    cookie_secret: {
        secret: process.env.COOKIE_SECRET
    }
});
exports.configuration = configuration;
//# sourceMappingURL=configuration.js.map