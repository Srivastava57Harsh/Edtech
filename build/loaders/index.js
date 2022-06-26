"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const express_1 = __importDefault(require("./express"));
const logger_1 = __importDefault(require("./logger"));
exports.default = async ({ expressApp }) => {
    await (0, database_1.default)();
    logger_1.default.info(`✌️ Connection to database successful`);
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
    logger_1.default.info('✅ All modules loaded!');
};
//# sourceMappingURL=index.js.map