import { Router } from 'express';
import OnboardingController from './onboarding.controller';

const router = Router();

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
router.get('/steps', OnboardingController.getSteps.bind(OnboardingController));

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
router.get('/steps/:stepId', OnboardingController.getStepById.bind(OnboardingController));

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
router.get('/onboarding', OnboardingController.getOnboardingStatus.bind(OnboardingController));

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
router.put('/onboarding/answers/:stepId', OnboardingController.saveAnswer.bind(OnboardingController));

export default router;
