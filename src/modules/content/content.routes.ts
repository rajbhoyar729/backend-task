import { Router } from 'express';
import ContentController from './content.controller';

const router = Router();

/**
 * @swagger
 * /api/content/placeholder:
 *   get:
 *     summary: Get placeholder content
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: List of placeholder content
 */
router.get('/placeholder', ContentController.getPlaceholderContent.bind(ContentController));

export default router;
