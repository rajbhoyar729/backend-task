"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const run_controller_1 = __importDefault(require("./run.controller"));
const router = (0, express_1.Router)();
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
router.get('/current', run_controller_1.default.getCurrentRun.bind(run_controller_1.default));
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
router.get('/:id', run_controller_1.default.getRunById.bind(run_controller_1.default));
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
router.get('/:id/route', run_controller_1.default.getRunRoute.bind(run_controller_1.default));
exports.default = router;
