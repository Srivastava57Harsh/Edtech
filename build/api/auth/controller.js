"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.loginUser = exports.verifyUser = exports.createUser = void 0;
const token_1 = require("./../../shared/token");
const database_1 = __importDefault(require("../../loaders/database"));
const logger_1 = __importDefault(require("../../loaders/logger"));
const bcrypt = __importStar(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const mongodb_1 = require("mongodb");
async function createUser(user) {
    const userExists = await (await (0, database_1.default)()).collection('users').findOne({ email: user.email });
    if (userExists) {
        return {
            bool: false,
            message: 'User already exists',
            status: 400,
        };
    }
    else {
        try {
            const saltData = bcrypt.genSaltSync(config_1.default.salt);
            user.password = bcrypt.hashSync(user.password, saltData);
            user.isVerified = false;
            await (await (0, database_1.default)()).collection('users').insertOne(user);
            return {
                bool: true,
                message: 'Success',
                status: 200,
            };
        }
        catch (e) {
            logger_1.default.error(e);
            return {
                bool: false,
                message: 'User could not be created',
                status: 400,
            };
        }
    }
}
exports.createUser = createUser;
async function verifyUser(phone, status) {
    try {
        const userData = await (await (0, database_1.default)()).collection('users').findOne({ phone: phone });
        if (!userData) {
            return {
                message: 'User does not exist, Sign Up instead',
                status: 404,
            };
        }
        else {
            if (status) {
                const verification = (await (0, database_1.default)()).collection('users');
                await verification.updateOne({ phone: phone }, { $set: { isVerified: true } });
                return {
                    message: 'User has been verified, record updated.',
                    status: 200,
                };
            }
            else {
                return {
                    message: 'User could not be verified.',
                    status: 500,
                };
            }
        }
    }
    catch (e) {
        logger_1.default.error(e);
        return {
            message: `Something went wrong, [ERROR : ${e}]`,
            status: 500,
        };
    }
}
exports.verifyUser = verifyUser;
async function loginUser(email, password) {
    try {
        const userData = await (await (0, database_1.default)()).collection('users').findOne({ email: email });
        if (!userData) {
            return {
                message: 'User does not exist, Sign Up instead',
                status: 404,
            };
        }
        else {
            if (userData.isVerified) {
                if (bcrypt.compareSync(password, userData.password)) {
                    return {
                        message: 'Login Successful',
                        status: 200,
                        accessToken: (0, token_1.createToken)({ id: userData._id.toString() }, config_1.default.jwtSecret, '30d'),
                        refreshToken: (0, token_1.createToken)({ id: userData._id.toString() }, config_1.default.jwtSecret, '1y'),
                    };
                }
                else {
                    return {
                        message: 'Password does not match',
                        status: 401,
                    };
                }
            }
            else {
                return {
                    message: 'User is not Verified',
                    status: 401,
                };
            }
        }
    }
    catch (e) {
        logger_1.default.error(e);
        return {
            message: `Something went wrong, [ERROR : ${e}]`,
            status: 500,
        };
    }
}
exports.loginUser = loginUser;
async function getProfile(token) {
    let id;
    try {
        id = (0, token_1.verifyToken)(token, config_1.default.jwtSecret).id;
    }
    catch (e) {
        logger_1.default.error(e);
        throw {
            message: 'Unauthorized Access',
            status: 401,
        };
    }
    const user = await (await (0, database_1.default)())
        .collection('users')
        .findOne({ _id: new mongodb_1.ObjectId(id) }, { projection: { email: 1, name: 1, phone: 1 } });
    if (!user) {
        throw {
            message: 'User does not exist',
            status: 404,
        };
    }
    return user;
}
exports.getProfile = getProfile;
//# sourceMappingURL=controller.js.map