import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Step from './modules/onboarding/step.model';
import Journey from './modules/journey/journey.model';
import Run from './modules/run/run.model';
import connectDB from './config/db';

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        console.log('Clearing existing data...');
        await Step.deleteMany({});
        await Journey.deleteMany({});
        await Run.deleteMany({});

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

        await Step.insertMany(steps);

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

        await Journey.insertMany(journeys);

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

        await Run.insertMany(runs);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error('Error with data import:', error);
        process.exit(1);
    }
};

seedData();
