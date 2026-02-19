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
const mongoose_1 = __importDefault(require("mongoose"));
const journey_model_1 = __importDefault(require("./journey.model"));
const favorite_model_1 = __importDefault(require("./favorite.model"));
class JourneyService {
    /**
     * Get all journeys
     */
    getAllJourneys() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield journey_model_1.default.find();
        });
    }
    /**
     * Get a journey by ID
     */
    getJourneyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield journey_model_1.default.findById(id);
        });
    }
    /**
     * Favorite a journey
     */
    favoriteJourney(deviceId, journeyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const journey = yield journey_model_1.default.findById(journeyId);
            if (!journey) {
                return null;
            }
            const objectJourneyId = new mongoose_1.default.Types.ObjectId(journeyId);
            // Using upsert to prevent duplicates logic if not handled by unique index race condition
            // But also returning the doc.
            // We need to cast to any or correct type because Mongoose types can be strict.
            const favorite = yield favorite_model_1.default.findOneAndUpdate({ deviceId, journeyId: objectJourneyId }, { deviceId, journeyId: objectJourneyId }, { upsert: true, new: true });
            return favorite;
        });
    }
    /**
     * Unfavorite a journey
     */
    unfavoriteJourney(deviceId, journeyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectJourneyId = new mongoose_1.default.Types.ObjectId(journeyId);
            yield favorite_model_1.default.findOneAndDelete({ deviceId, journeyId: objectJourneyId });
        });
    }
}
exports.default = new JourneyService();
