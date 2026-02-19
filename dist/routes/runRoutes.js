"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const runController_1 = require("../controllers/runController");
const router = express_1.default.Router();
router.get('/current', runController_1.getCurrentRun);
router.get('/:id', runController_1.getRunById);
router.get('/:id/route', runController_1.getRunRoute);
exports.default = router;
