import { Request, Response } from 'express';
import RunService from './run.service';

class RunController {
    /**
     * GET /api/runs/current
     */
    async getCurrentRun(req: Request, res: Response) {
        const deviceId = req.headers['deviceid'] as string;

        if (!deviceId) {
            return res.status(400).json({ success: false, error: 'DeviceId header is required' });
        }

        try {
            const run = await RunService.getCurrentRun(deviceId);
            if (run) {
                res.json({ success: true, data: run });
            } else {
                res.status(404).json({ success: false, error: 'No runs found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }

    /**
     * GET /api/runs/:id
     */
    async getRunById(req: Request, res: Response) {
        try {
            const run = await RunService.getRunById(req.params.id as string);
            if (run) {
                res.json({ success: true, data: run });
            } else {
                res.status(404).json({ success: false, error: 'Run not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }

    /**
     * GET /api/runs/:id/route
     */
    async getRunRoute(req: Request, res: Response) {
        try {
            const route = await RunService.getRunRoute(req.params.id as string);
            if (route) {
                res.json({ success: true, data: route });
            } else {
                res.status(404).json({ success: false, error: 'Run not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }
}

export default new RunController();
