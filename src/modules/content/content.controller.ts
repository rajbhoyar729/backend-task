import { Request, Response } from 'express';
import ContentService from './content.service';

class ContentController {
    /**
     * GET /api/content/placeholder
     */
    async getPlaceholderContent(req: Request, res: Response) {
        try {
            const data = await ContentService.fetchContent();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }
    }
}

export default new ContentController();
