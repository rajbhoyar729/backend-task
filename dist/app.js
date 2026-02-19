"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
// Rate Limiting
const rateLimiter_1 = require("./middleware/rateLimiter");
app.use('/api', rateLimiter_1.apiLimiter);
// Swagger Docs
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
// Routes
// Routes
const onboarding_routes_1 = __importDefault(require("./modules/onboarding/onboarding.routes")); // Updated import
const journey_routes_1 = __importDefault(require("./modules/journey/journey.routes"));
const run_routes_1 = __importDefault(require("./modules/run/run.routes"));
const content_routes_1 = __importDefault(require("./modules/content/content.routes"));
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Mount routes
app.use('/api', onboarding_routes_1.default);
app.use('/api/journeys', journey_routes_1.default);
app.use('/api/runs', run_routes_1.default);
app.use('/api/content', content_routes_1.default);
// Error Handling
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
