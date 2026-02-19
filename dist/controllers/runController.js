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
exports.getRunRoute = exports.getRunById = exports.getCurrentRun = void 0;
const Run_1 = __importDefault(require("../models/Run"));
// @desc    Get current/most recent run
// @route   GET /api/runs/current
// @access  Public (uses deviceId header)
const getCurrentRun = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.headers['deviceid'];
    if (!deviceId) {
        return res.status(400).json({ success: false, error: 'DeviceId header is required' });
    }
    try {
        const run = yield Run_1.default.findOne({ deviceId }).sort({ startTime: -1 });
        if (run) {
            res.json({ success: true, data: run });
        }
        else {
            res.status(404).json({ success: false, error: 'No runs found' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getCurrentRun = getCurrentRun;
// @desc    Get single run by ID
// @route   GET /api/runs/:id
// @access  Public
const getRunById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const run = yield Run_1.default.findById(req.params.id);
        if (run) {
            res.json({ success: true, data: run });
        }
        else {
            res.status(404).json({ success: false, error: 'Run not found' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getRunById = getRunById;
// @desc    Get run route data
// @route   GET /api/runs/:id/route
// @access  Public
const getRunRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const run = yield Run_1.default.findById(req.params.id).select('route');
        if (run) {
            res.json({ success: true, data: run.route });
        }
        else {
            res.status(404).json({ success: false, error: 'Run not found' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getRunRoute = getRunRoute;
