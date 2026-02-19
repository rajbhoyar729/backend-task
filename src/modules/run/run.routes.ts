import { Router } from 'express';
import RunController from './run.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Runs
 *   description: Running activity management
 */

/**
 * @swagger
 * /api/runs/current:
 *   get:
 *     summary: Get current/most recent run
 *     tags: [Runs]
 *     security:
 *       - deviceId: []
 *     responses:
 *       200:
 *         description: Current run details
 *       404:
 *         description: No runs found
 */
router.get('/current', RunController.getCurrentRun.bind(RunController));

/**
 * @swagger
 * /api/runs/{id}:
 *   get:
 *     summary: Get run by ID
 *     tags: [Runs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Run details
 *       404:
 *         description: Run not found
 */
router.get('/:id', RunController.getRunById.bind(RunController));

/**
 * @swagger
 * /api/runs/{id}/route:
 *   get:
 *     summary: Get run route
 *     tags: [Runs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Run route coordinates
 *       404:
 *         description: Run not found
 */
router.get('/:id/route', RunController.getRunRoute.bind(RunController));

export default router;
