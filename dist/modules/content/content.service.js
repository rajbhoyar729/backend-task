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
const axios_1 = __importDefault(require("axios"));
class ContentService {
    constructor() {
        this.PLACEHOLDER_API = 'https://jsonplaceholder.typicode.com/posts';
    }
    /**
     * Fetches and normalizes external content.
     */
    fetchContent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.PLACEHOLDER_API);
                // Normalize data to a UI-friendly shape
                return response.data.slice(0, 5).map((item) => ({
                    id: item.id,
                    title: item.title,
                    description: item.body,
                    image: `https://picsum.photos/seed/${item.id}/300/200` // Placeholder image
                }));
            }
            catch (error) {
                throw new Error('Failed to fetch external content');
            }
        });
    }
}
exports.default = new ContentService();
