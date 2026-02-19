import { Request, Response } from 'express';
import JourneyService from './journey.service';

class JourneyController {
    /**
     * GET /api/journeys
     */
    async getJourneys(req: Request, res: Response) {
        try {
            const journeys = await JourneyService.getAllJourneys();
            res.json({ success: true, data: journeys });
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }

    /**
     * GET /api/journeys/:id
     */
    async getJourneyById(req: Request, res: Response) {
        try {
            const journey = await JourneyService.getJourneyById(req.params.id as string);
            if (journey) {
                res.json({ success: true, data: journey });
            } else {
                res.status(404).json({ success: false, error: 'Journey not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }

    /**
     * POST /api/journeys/:id/favorite
     */
    async favoriteJourney(req: Request, res: Response) {
        const deviceId = req.headers['deviceid'] as string;
        const journeyId = req.params.id as string;

        if (!deviceId) {
            return res.status(400).json({ success: false, error: 'DeviceId header is required' });
        }

        try {
            const favorite = await JourneyService.favoriteJourney(deviceId, journeyId);
            if (favorite) {
                res.json({ success: true, data: favorite });
            } else {
                res.status(404).json({ success: false, error: 'Journey not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }

    /**
     * DELETE /api/journeys/:id/favorite
     */
    async unfavoriteJourney(req: Request, res: Response) {
        const deviceId = req.headers['deviceid'] as string;
        const journeyId = req.params.id as string;

        if (!deviceId) {
            return res.status(400).json({ success: false, error: 'DeviceId header is required' });
        }

        try {
            await JourneyService.unfavoriteJourney(deviceId, journeyId);
            res.json({ success: true, data: { message: 'Journey removed from favorites' } });
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }
}

export default new JourneyController();
