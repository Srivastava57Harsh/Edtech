"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileValidator = exports.signUpValidator = exports.loginValidator = void 0;
const logger_1 = __importDefault(require("../../loaders/logger"));
const schema_1 = require("./schema");
async function loginValidator(req, res, next) {
    try {
        req.body = await schema_1.loginSchema.validate(req.body, { stripUnknown: true });
        next();
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(422).json({
            message: 'Validation Failed',
            error: e.errors.map(error => error),
        });
    }
}
exports.loginValidator = loginValidator;
async function signUpValidator(req, res, next) {
    try {
        req.body = await schema_1.signUpSchema.validate(req.body, { stripUnknown: true });
        next();
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(422).json({
            message: 'Validation Failed',
            error: e.errors.map(error => error),
        });
    }
}
exports.signUpValidator = signUpValidator;
async function getProfileValidator(req, res, next) {
    try {
        req.body = await schema_1.getProfileSchema.validate(req.headers);
        next();
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(422).json({
            message: 'Token Required',
            error: e.errors.map(error => error),
        });
    }
}
exports.getProfileValidator = getProfileValidator;
//# sourceMappingURL=validator.js.map