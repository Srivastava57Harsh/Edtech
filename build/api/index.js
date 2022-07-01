"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = __importDefault(require("./auth/router"));
exports.default = () => {
    const app = (0, express_1.Router)();
    app.use('/auth', router_1.default);
    return app;
};
//# sourceMappingURL=index.js.map