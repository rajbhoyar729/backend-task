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
const step_model_1 = __importDefault(require("./step.model"));
const userAnswer_model_1 = __importDefault(require("./userAnswer.model"));
class OnboardingService {
    getAllSteps() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield step_model_1.default.find().sort({ order: 1 });
        });
    }
    getStepById(stepId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield step_model_1.default.findOne({ stepId });
        });
    }
    saveAnswer(deviceId, stepId, answer, textDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const step = yield step_model_1.default.findOne({ stepId });
            if (!step) {
                return { success: false, error: 'Step not found', status: 404 };
            }
            // Basic Validation
            if (step.type === 'single-select' && Array.isArray(answer)) {
                return { success: false, error: 'Single-select step requires a single string answer', status: 400 };
            }
            if (step.type === 'multi-select' && !Array.isArray(answer)) {
                return { success: false, error: 'Multi-select step requires an array of answers', status: 400 };
            }
            if (textDetails && textDetails.length > 250) {
                return { success: false, error: 'Text details must be 250 characters or less', status: 400 };
            }
            const updatedAnswer = yield userAnswer_model_1.default.findOneAndUpdate({ deviceId, stepId }, { answer, textDetails }, { new: true, upsert: true });
            return { success: true, data: updatedAnswer };
        });
    }
    getOnboardingStatus(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalSteps = yield step_model_1.default.countDocuments();
            const completedAnswers = yield userAnswer_model_1.default.countDocuments({ deviceId });
            // Identify which steps are completed
            const answers = yield userAnswer_model_1.default.find({ deviceId }).select('stepId');
            const completedStepIds = answers.map((a) => a.stepId);
            return {
                totalSteps,
                completedSteps: completedAnswers, // Maintaining name as per previous implementation logic (though usage ambiguous)
                completedStepIds, // More useful
                isComplete: totalSteps === completedAnswers,
            };
        });
    }
}
exports.default = new OnboardingService();
