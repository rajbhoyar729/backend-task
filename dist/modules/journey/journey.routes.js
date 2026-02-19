"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const journey_controller_1 = __importDefault(require("./journey.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Journeys
 *   description: Journey management
 */
/**
 * @swagger
 * /api/journeys:
 *   get:
 *     summary: Get all journeys
 *     tags: [Journeys]
 *     responses:
 *       200:
 *         description: List of journeys
 */
router.get('/', journey_controller_1.default.getJourneys.bind(journey_controller_1.default));
/**
 * @swagger
 * /api/journeys/{id}:
 *   get:
 *     summary: Get journey by ID
 *     tags: [Journeys]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Journey details
 *       404:
 *         description: Journey not found
 */
router.get('/:id', journey_controller_1.default.getJourneyById.bind(journey_controller_1.default));
/**
 * @swagger
 * /api/journeys/{id}/favorite:
 *   post:
 *     summary: Favorite a journey
 *     tags: [Journeys]
 *     security:
 *       - deviceId: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Journey favorited
 */
router.post('/:id/favorite', journey_controller_1.default.favoriteJourney.bind(journey_controller_1.default));
/**
 * @swagger
 * /api/journeys/{id}/favorite:
 *   delete:
 *     summary: Unfavorite a journey
 *     tags: [Journeys]
 *     security:
 *       - deviceId: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Journey unfavorited
 */
router.delete('/:id/favorite', journey_controller_1.default.unfavoriteJourney.bind(journey_controller_1.default));
exports.default = router;
