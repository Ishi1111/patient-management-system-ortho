"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = require("joi");
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid("development", "production"),
    SERVER_PORT: Joi.number().default(5001),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASS: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_SYNC: Joi.boolean().required(),
    DATABASE_LOG: Joi.boolean().required(),
    DATABASE_CACHE: Joi.boolean().required(),
    JWT_EXPIRE_IN: Joi.number().default(604800000),
    JWT_SECRET_KEY: Joi.string().required(),
    COOKIE_SECRET: Joi.string().required()
});
//# sourceMappingURL=validation.js.map