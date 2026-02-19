"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const onboarding_controller_1 = __importDefault(require("./onboarding.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Onboarding
 *   description: User onboarding process
 */
/**
 * @swagger
 * /api/steps:
 *   get:
 *     summary: Get all onboarding steps
 *     tags: [Onboarding]
 *     responses:
 *       200:
 *         description: List of steps
 */
router.get('/steps', onboarding_controller_1.default.getSteps.bind(onboarding_controller_1.default));
/**
 * @swagger
 * /api/steps/{stepId}:
 *   get:
 *     summary: Get step by ID
 *     tags: [Onboarding]
 *     parameters:
 *       - in: path
 *         name: stepId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Step details
 *       404:
 *         description: Step not found
 */
router.get('/steps/:stepId', onboarding_controller_1.default.getStepById.bind(onboarding_controller_1.default));
/**
 * @swagger
 * /api/onboarding:
 *   get:
 *     summary: Get onboarding status
 *     tags: [Onboarding]
 *     security:
 *       - deviceId: []
 *     responses:
 *       200:
 *         description: Onboarding status
 */
router.get('/onboarding', onboarding_controller_1.default.getOnboardingStatus.bind(onboarding_controller_1.default));
/**
 * @swagger
 * /api/onboarding/answers/{stepId}:
 *   put:
 *     summary: Save answer for a step
 *     tags: [Onboarding]
 *     security:
 *       - deviceId: []
 *     parameters:
 *       - in: path
 *         name: stepId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 oneOf:
 *                   - type: string
 *                   - type: array
 *                     items:
 *                       type: string
 *               textDetails:
 *                 type: string
 *     responses:
 *       200:
 *         description: Answer saved
 */
router.put('/onboarding/answers/:stepId', onboarding_controller_1.default.saveAnswer.bind(onboarding_controller_1.default));
exports.default = router;
