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
const run_model_1 = __importDefault(require("./run.model"));
class RunService {
    /**
     * Get the most recent run for a device
     */
    getCurrentRun(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield run_model_1.default.findOne({ deviceId }).sort({ startTime: -1 });
        });
    }
    /**
     * Get a run by ID
     */
    getRunById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield run_model_1.default.findById(id);
        });
    }
    /**
     * Get route data for a run
     */
    getRunRoute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const run = yield run_model_1.default.findById(id).select('route');
            return run ? run.route : null;
        });
    }
}
exports.default = new RunService();
