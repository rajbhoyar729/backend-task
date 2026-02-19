"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stepController_1 = require("../controllers/stepController");
const router = express_1.default.Router();
router.get('/steps', stepController_1.getSteps);
router.get('/steps/:stepId', stepController_1.getStepById);
router.get('/onboarding', stepController_1.getOnboardingStatus);
router.put('/onboarding/answers/:stepId', stepController_1.saveAnswer);
exports.default = router;
