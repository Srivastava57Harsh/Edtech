"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("../config"));
const api_1 = __importDefault(require("../api"));
exports.default = ({ app }) => {
    /**
     * Health Check endpoints
     */
    app.get('/healthcheck', (req, res) => {
        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
        };
        try {
            return res.json(healthcheck);
        }
        catch (e) {
            return res.status(503).send();
        }
    });
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');
    // Middleware that helps secure app by setting headers
    app.use((0, helmet_1.default)());
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use((0, cors_1.default)());
    // Middleware that transforms the raw string of req.body into json
    app.use(body_parser_1.default.json());
    // Load API routes
    app.use(config_1.default.api.prefix, (0, api_1.default)());
};
//# sourceMappingURL=express.js.map