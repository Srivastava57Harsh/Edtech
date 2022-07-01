"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("../config"));
let db;
async function initializeClient() {
    const client = await mongodb_1.MongoClient.connect(config_1.default.databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
    });
    return client.db();
}
exports.default = async () => {
    if (!db) {
        db = await initializeClient();
    }
    return db;
};
//# sourceMappingURL=database.js.map