"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwException = void 0;
const common_1 = require("@nestjs/common");
const throwException = (error, errorMsgObj = {}) => {
    if (error && error.response) {
        if (error.response.statusCode == common_1.HttpStatus.CONFLICT) {
            throw new common_1.ConflictException(getErrorMessageByCode(common_1.HttpStatus.CONFLICT, errorMsgObj) ?? error.response.message);
        }
        else if (error.response.statusCode == common_1.HttpStatus.BAD_REQUEST) {
            throw new common_1.BadRequestException(getErrorMessageByCode(common_1.HttpStatus.BAD_REQUEST, errorMsgObj) ?? error.response.message);
        }
        else if (error.response.statusCode == common_1.HttpStatus.NOT_FOUND) {
            throw new common_1.NotFoundException(getErrorMessageByCode(common_1.HttpStatus.NOT_FOUND, errorMsgObj) ?? error.response.message);
        }
        else if (error.response.statusCode == common_1.HttpStatus.UNAUTHORIZED) {
            throw new common_1.UnauthorizedException(getErrorMessageByCode(common_1.HttpStatus.UNAUTHORIZED, errorMsgObj) ?? error.response.message);
        }
        else if (error.response.statusCode == common_1.HttpStatus.NOT_ACCEPTABLE) {
            throw new common_1.NotAcceptableException(getErrorMessageByCode(common_1.HttpStatus.NOT_ACCEPTABLE, errorMsgObj) ?? error.response.message);
        }
    }
    throw new common_1.InternalServerErrorException(error);
};
exports.throwException = throwException;
function getErrorMessageByCode(status, errorMsgObj) {
    return Object.keys(errorMsgObj).find((prop) => Number(prop) == status) ? errorMsgObj[status] : null;
}
//# sourceMappingURL=throw-exception.js.map