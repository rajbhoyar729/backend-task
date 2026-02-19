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
exports.unfavoriteJourney = exports.favoriteJourney = exports.getJourneyById = exports.getJourneys = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Journey_1 = __importDefault(require("../models/Journey"));
const Favorite_1 = __importDefault(require("../models/Favorite"));
// @desc    Get all journeys
// @route   GET /api/journeys
// @access  Public
const getJourneys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const journeys = yield Journey_1.default.find();
        res.json({ success: true, data: journeys });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getJourneys = getJourneys;
// @desc    Get single journey
// @route   GET /api/journeys/:id
// @access  Public
const getJourneyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const journey = yield Journey_1.default.findById(req.params.id);
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
exports.getJourneyById = getJourneyById;
// @desc    Favorite a journey
// @route   POST /api/journeys/:id/favorite
// @access  Public (uses deviceId header)
const favoriteJourney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.headers['deviceid'];
    const journeyId = req.params.id;
    if (!deviceId) {
        return res.status(400).json({ success: false, error: 'DeviceId header is required' });
    }
    try {
        const journey = yield Journey_1.default.findById(journeyId);
        if (!journey) {
            return res.status(404).json({ success: false, error: 'Journey not found' });
        }
        // Ensure journeyId is treated as an ObjectId for the Favorite model
        const objectJourneyId = new mongoose_1.default.Types.ObjectId(journeyId);
        // @ts-ignore
        const favorite = yield Favorite_1.default.findOneAndUpdate({ deviceId, journeyId: objectJourneyId }, { deviceId, journeyId: objectJourneyId }, { upsert: true, new: true });
        res.json({ success: true, data: favorite });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.favoriteJourney = favoriteJourney;
// @desc    Unfavorite a journey
// @route   DELETE /api/journeys/:id/favorite
// @access  Public (uses deviceId header)
const unfavoriteJourney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.headers['deviceid'];
    const journeyId = req.params.id;
    if (!deviceId) {
        return res.status(400).json({ success: false, error: 'DeviceId header is required' });
    }
    try {
        yield Favorite_1.default.findOneAndDelete({ deviceId, journeyId });
        res.json({ success: true, data: { message: 'Journey removed from favorites' } });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.unfavoriteJourney = unfavoriteJourney;
