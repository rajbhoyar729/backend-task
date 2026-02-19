"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_controller_1 = __importDefault(require("./content.controller"));
const router = (0, express_1.Router)();
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
router.get('/placeholder', content_controller_1.default.getPlaceholderContent.bind(content_controller_1.default));
exports.default = router;
