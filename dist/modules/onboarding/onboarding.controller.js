"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const onboarding_service_1 = __importDefault(require("./onboarding.service"));
class OnboardingController {
    /**
     * GET /api/steps
     */
    getSteps(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const steps = yield onboarding_service_1.default.getAllSteps();
                res.json({ success: true, data: steps });
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    /**
     * GET /api/steps/:stepId
     */
    getStepById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const step = yield onboarding_service_1.default.getStepById(req.params.stepId);
                if (step) {
                    res.json({ success: true, data: step });
                }
                else {
                    res.status(404).json({ success: false, error: 'Step not found' });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    /**
     * PUT /api/onboarding/answers/:stepId
     */
    saveAnswer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stepId = req.params.stepId;
            const { answer, textDetails } = req.body;
            const deviceId = req.headers['deviceid'];
            if (!deviceId) {
                return res.status(400).json({ success: false, error: 'DeviceId header is required' });
            }
            try {
                const result = yield onboarding_service_1.default.saveAnswer(deviceId, stepId, answer, textDetails);
                if (!result.success) {
                    return res.status(result.status || 400).json({ success: false, error: result.error });
                }
                res.json({ success: true, data: result.data });
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    /**
     * GET /api/onboarding
     */
    getOnboardingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceId = req.headers['deviceid'];
            if (!deviceId) {
                return res.status(400).json({ success: false, error: 'DeviceId header is required' });
            }
            try {
                const status = yield onboarding_service_1.default.getOnboardingStatus(deviceId);
                res.json({ success: true, data: status });
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
}
exports.default = new OnboardingController();
