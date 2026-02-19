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
const dotenv_1 = __importDefault(require("dotenv"));
const step_model_1 = __importDefault(require("./modules/onboarding/step.model"));
const journey_model_1 = __importDefault(require("./modules/journey/journey.model"));
const run_model_1 = __importDefault(require("./modules/run/run.model"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        console.log('Clearing existing data...');
        yield step_model_1.default.deleteMany({});
        yield journey_model_1.default.deleteMany({});
        yield run_model_1.default.deleteMany({});
        console.log('Seeding Steps...');
        const steps = [
            {
                stepId: 'step2',
                title: 'Select your sports',
                type: 'multi-select',
                order: 2,
                options: [
                    { id: 'football', label: 'Football', value: 'football' },
                    { id: 'basketball', label: 'Basketball', value: 'basketball' },
                    { id: 'tennis', label: 'Tennis', value: 'tennis' },
                    { id: 'running', label: 'Running', value: 'running' },
                    { id: 'yoga', label: 'Yoga', value: 'yoga' },
                ],
            },
            {
                stepId: 'step3',
                title: 'Activity preferences',
                type: 'multi-select',
                order: 3,
                options: [
                    { id: 'indoor', label: 'Indoor', value: 'indoor' },
                    { id: 'outdoor', label: 'Outdoor', value: 'outdoor' },
                    { id: 'group', label: 'Group', value: 'group' },
                    { id: 'solo', label: 'Solo', value: 'solo' },
                ],
            },
            {
                stepId: 'step4',
                title: 'How often do you exercise?',
                type: 'single-select',
                order: 4,
                options: [
                    { id: 'rarely', label: 'Rarely', value: 'rarely' },
                    { id: 'sometimes', label: '1-2 times a week', value: 'sometimes' },
                    { id: 'often', label: '3-4 times a week', value: 'often' },
                    { id: 'daily', label: 'Daily', value: 'daily' },
                ],
            },
            {
                stepId: 'step5',
                title: 'What is your fitness level?',
                type: 'single-select',
                order: 5,
                options: [
                    { id: 'beginner', label: 'Beginner', value: 'beginner' },
                    { id: 'intermediate', label: 'Intermediate', value: 'intermediate' },
                    { id: 'advanced', label: 'Advanced', value: 'advanced' },
                ],
            },
            {
                stepId: 'step6',
                title: 'Do you have any injuries?',
                type: 'yes-no',
                order: 6,
                description: 'If yes, please provide details (optional)',
            },
            {
                stepId: 'step7',
                title: 'Primary Goal',
                type: 'single-select',
                order: 7,
                options: [
                    { id: 'weight_loss', label: 'Weight Loss', value: 'weight_loss' },
                    { id: 'muscle_gain', label: 'Muscle Gain', value: 'muscle_gain' },
                    { id: 'endurance', label: 'Improve Endurance', value: 'endurance' },
                    { id: 'health', label: 'General Health', value: 'health' },
                ],
            },
            {
                stepId: 'step8',
                title: 'Preferred time of day',
                type: 'single-select',
                order: 8,
                options: [
                    { id: 'morning', label: 'Morning', value: 'morning' },
                    { id: 'afternoon', label: 'Afternoon', value: 'afternoon' },
                    { id: 'evening', label: 'Evening', value: 'evening' },
                ],
            },
        ];
        yield step_model_1.default.insertMany(steps);
        console.log('Seeding Journeys...');
        const journeys = [
            {
                title: 'Morning Yoga Flow',
                description: 'A 20-minute yoga routine to start your day.',
                imageUrl: 'https://placehold.co/600x400/orange/white?text=Yoga',
                content: 'Detailed content about morning yoga positions...',
            },
            {
                title: '5K Run Training',
                description: 'Week 1 of your couch to 5k journey.',
                imageUrl: 'https://placehold.co/600x400/blue/white?text=Running',
                content: 'Plan for the first week of 5k training...',
            },
            {
                title: 'HIIT Blast',
                description: 'High Intensity Interval Training for maximum calorie burn.',
                imageUrl: 'https://placehold.co/600x400/red/white?text=HIIT',
                content: 'Circuit details for HIIT...',
            },
            {
                title: 'Meditation for Recovery',
                description: 'Guided meditation to help muscles recover.',
                imageUrl: 'https://placehold.co/600x400/purple/white?text=Meditation',
                content: 'Audio links and guidance...',
            },
        ];
        yield journey_model_1.default.insertMany(journeys);
        console.log('Seeding Runs...');
        const runs = [
            {
                deviceId: 'seed-device-001',
                startTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
                endTime: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 30), // 30 mins later
                distance: 5000,
                duration: 1800,
                calories: 300,
                route: [
                    { latitude: 37.7749, longitude: -122.4194 },
                    { latitude: 37.7750, longitude: -122.4180 },
                    { latitude: 37.7755, longitude: -122.4160 },
                    { latitude: 37.7760, longitude: -122.4140 },
                ],
            },
            {
                deviceId: 'seed-device-001',
                startTime: new Date(),
                endTime: new Date(Date.now() + 1000 * 60 * 45),
                distance: 7000,
                duration: 2700,
                calories: 450,
                route: [
                    { latitude: 40.7128, longitude: -74.0060 },
                    { latitude: 40.7130, longitude: -74.0050 },
                    { latitude: 40.7140, longitude: -74.0040 },
                    { latitude: 40.7150, longitude: -74.0030 },
                ],
            },
        ];
        yield run_model_1.default.insertMany(runs);
        console.log('Data Imported!');
        process.exit();
    }
    catch (error) {
        console.error('Error with data import:', error);
        process.exit(1);
    }
});
seedData();
