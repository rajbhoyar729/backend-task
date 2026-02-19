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
const run_service_1 = __importDefault(require("./run.service"));
class RunController {
    /**
     * GET /api/runs/current
     */
    getCurrentRun(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceId = req.headers['deviceid'];
            if (!deviceId) {
                return res.status(400).json({ success: false, error: 'DeviceId header is required' });
            }
            try {
                const run = yield run_service_1.default.getCurrentRun(deviceId);
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
    }
    /**
     * GET /api/runs/:id
     */
    getRunById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const run = yield run_service_1.default.getRunById(req.params.id);
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
    }
    /**
     * GET /api/runs/:id/route
     */
    getRunRoute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const route = yield run_service_1.default.getRunRoute(req.params.id);
                if (route) {
                    res.json({ success: true, data: route });
                }
                else {
                    res.status(404).json({ success: false, error: 'Run not found' });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
}
exports.default = new RunController();
