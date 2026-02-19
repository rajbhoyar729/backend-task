"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const journeyController_1 = require("../controllers/journeyController");
const router = express_1.default.Router();
router.get('/', journeyController_1.getJourneys);
router.get('/:id', journeyController_1.getJourneyById);
router.post('/:id/favorite', journeyController_1.favoriteJourney);
router.delete('/:id/favorite', journeyController_1.unfavoriteJourney);
exports.default = router;
