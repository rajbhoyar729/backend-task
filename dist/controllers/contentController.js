"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExternalContent = void 0;
const axios_1 = __importDefault(require("axios"));
// @desc    Fetch and normalize external content
// @route   GET /api/content/placeholder
// @access  Public
const getExternalContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // using jsonplaceholder as bacon ipsum might be just text
        const response = yield axios_1.default.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const normalizedContent = response.data.map((post) => ({
            id: `ext-${post.id}`,
            title: post.title,
            description: post.body.substring(0, 100) + '...',
            content: post.body,
            source: 'JSONPlaceholder',
            imageUrl: `https://placehold.co/600x400?text=${encodeURIComponent(post.title.substring(0, 10))}`
        }));
        res.json({ success: true, data: normalizedContent });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.getExternalContent = getExternalContent;
