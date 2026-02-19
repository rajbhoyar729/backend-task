import { Request, Response } from 'express';
import OnboardingService from './onboarding.service';

class OnboardingController {
    /**
     * GET /api/steps
     */
    async getSteps(req: Request, res: Response) {
        try {
            const steps = await OnboardingService.getAllSteps();
            res.json({ success: true, data: steps });
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }

    /**
     * GET /api/steps/:stepId
     */
    async getStepById(req: Request, res: Response) {
        try {
            const step = await OnboardingService.getStepById(req.params.stepId as string);
            if (step) {
                res.json({ success: true, data: step });
            } else {
                res.status(404).json({ success: false, error: 'Step not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }

    /**
     * PUT /api/onboarding/answers/:stepId
     */
    async saveAnswer(req: Request, res: Response) {
        const stepId = req.params.stepId as string;
        const { answer, textDetails } = req.body;
        const deviceId = req.headers['deviceid'] as string;

        if (!deviceId) {
            return res.status(400).json({ success: false, error: 'DeviceId header is required' });
        }

        try {
            const result = await OnboardingService.saveAnswer(deviceId, stepId, answer, textDetails);

            if (!result.success) {
                return res.status(result.status || 400).json({ success: false, error: result.error });
            }

            res.json({ success: true, data: result.data });
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }

    /**
     * GET /api/onboarding
     */
    async getOnboardingStatus(req: Request, res: Response) {
        const deviceId = req.headers['deviceid'] as string;

        if (!deviceId) {
            return res.status(400).json({ success: false, error: 'DeviceId header is required' });
        }

        try {
            const status = await OnboardingService.getOnboardingStatus(deviceId);
            res.json({ success: true, data: status });
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }
}

export default new OnboardingController();
