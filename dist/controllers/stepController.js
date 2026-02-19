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
exports.getOnboardingStatus = exports.saveAnswer = exports.getStepById = exports.getSteps = void 0;
const Step_1 = __importDefault(require("../models/Step"));
const UserAnswer_1 = __importDefault(require("../models/UserAnswer"));
// @desc    Get all steps
// @route   GET /api/steps
// @access  Public
const getSteps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const steps = yield Step_1.default.find().sort({ order: 1 });
        res.json({ success: true, data: steps });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getSteps = getSteps;
// @desc    Get single step
// @route   GET /api/steps/:stepId
// @access  Public
const getStepById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const step = yield Step_1.default.findOne({ stepId: req.params.stepId });
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
exports.getStepById = getStepById;
// @desc    Save/Update answer for a step
// @route   PUT /api/onboarding/answers/:stepId
// @access  Public (uses deviceId header)
const saveAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stepId } = req.params;
    const { answer, textDetails } = req.body;
    const deviceId = req.headers['deviceid'];
    if (!deviceId) {
        return res.status(400).json({ success: false, error: 'DeviceId header is required' });
    }
    try {
        const step = yield Step_1.default.findOne({ stepId });
        if (!step) {
            return res.status(404).json({ success: false, error: 'Step not found' });
        }
        // Basic Validation based on step type
        if (step.type === 'single-select' && Array.isArray(answer)) {
            return res.status(400).json({ success: false, error: 'Single-select step requires a single string answer' });
        }
        if (step.type === 'multi-select' && !Array.isArray(answer)) {
            return res.status(400).json({ success: false, error: 'Multi-select step requires an array of answers' });
        }
        if (step.type === 'yes-no' && typeof answer !== 'string') {
            // Assuming yes/no answer is passed as string 'yes'/'no' or boolean, sticking to string for simplicity with Schema Mix
            // But schema says Mixed. Let's assume string for simplicity or boolean.
            // If strict, check logic here.
        }
        if (textDetails && textDetails.length > 250) {
            return res.status(400).json({ success: false, error: 'Text details must be 250 characters or less' });
        }
        const updatedAnswer = yield UserAnswer_1.default.findOneAndUpdate({ deviceId, stepId }, { answer, textDetails }, { new: true, upsert: true });
        res.json({ success: true, data: updatedAnswer });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.saveAnswer = saveAnswer;
// @desc    Get onboarding status/progress
// @route   GET /api/onboarding
// @access  Public (uses deviceId header)
const getOnboardingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.headers['deviceid'];
    if (!deviceId) {
        return res.status(400).json({ success: false, error: 'DeviceId header is required' });
    }
    try {
        const totalSteps = yield Step_1.default.countDocuments();
        const completedAnswers = yield UserAnswer_1.default.countDocuments({ deviceId });
        // Identify which steps are completed
        const answers = yield UserAnswer_1.default.find({ deviceId }).select('stepId');
        const completedStepIds = answers.map((a) => a.stepId);
        res.json({
            success: true,
            data: {
                totalSteps,
                completedSteps: completedAnswers,
                completedStepIds,
                isComplete: totalSteps === completedAnswers, // simplistic check
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getOnboardingStatus = getOnboardingStatus;
