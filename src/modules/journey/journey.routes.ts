import { Router } from 'express';
import JourneyController from './journey.controller';

const router = Router();

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
router.get('/', JourneyController.getJourneys.bind(JourneyController));

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
router.get('/:id', JourneyController.getJourneyById.bind(JourneyController));

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
router.post('/:id/favorite', JourneyController.favoriteJourney.bind(JourneyController));

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
router.delete('/:id/favorite', JourneyController.unfavoriteJourney.bind(JourneyController));

export default router;
