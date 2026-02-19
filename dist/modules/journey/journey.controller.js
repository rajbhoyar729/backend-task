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
const journey_service_1 = __importDefault(require("./journey.service"));
class JourneyController {
    /**
     * GET /api/journeys
     */
    getJourneys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const journeys = yield journey_service_1.default.getAllJourneys();
                res.json({ success: true, data: journeys });
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    /**
     * GET /api/journeys/:id
     */
    getJourneyById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const journey = yield journey_service_1.default.getJourneyById(req.params.id);
                if (journey) {
                    res.json({ success: true, data: journey });
                }
                else {
                    res.status(404).json({ success: false, error: 'Journey not found' });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    /**
     * POST /api/journeys/:id/favorite
     */
    favoriteJourney(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceId = req.headers['deviceid'];
            const journeyId = req.params.id;
            if (!deviceId) {
                return res.status(400).json({ success: false, error: 'DeviceId header is required' });
            }
            try {
                const favorite = yield journey_service_1.default.favoriteJourney(deviceId, journeyId);
                if (favorite) {
                    res.json({ success: true, data: favorite });
                }
                else {
                    res.status(404).json({ success: false, error: 'Journey not found' });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
    /**
     * DELETE /api/journeys/:id/favorite
     */
    unfavoriteJourney(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceId = req.headers['deviceid'];
            const journeyId = req.params.id;
            if (!deviceId) {
                return res.status(400).json({ success: false, error: 'DeviceId header is required' });
            }
            try {
                yield journey_service_1.default.unfavoriteJourney(deviceId, journeyId);
                res.json({ success: true, data: { message: 'Journey removed from favorites' } });
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
}
exports.default = new JourneyController();
