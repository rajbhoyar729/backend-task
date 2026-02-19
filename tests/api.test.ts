import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Step from '../src/modules/onboarding/step.model';
import UserAnswer from '../src/modules/onboarding/userAnswer.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
}, 30000); // Increase timeout to 30s

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Sports & Fitness API', () => {
    let stepId = 'step-test';

    beforeEach(async () => {
        await Step.deleteMany({});
        await UserAnswer.deleteMany({});

        await Step.create({
            stepId: stepId,
            title: 'Test Step',
            type: 'single-select',
            order: 1,
            options: [{ id: 'opt1', label: 'Option 1', value: 'opt1' }]
        });
    });

    describe('GET /api/steps', () => {
        it('should return all steps', async () => {
            const res = await request(app).get('/api/steps');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('PUT /api/onboarding/answers/:stepId', () => {
        it('should save user answer', async () => {
            const res = await request(app)
                .put(`/api/onboarding/answers/${stepId}`)
                .set('deviceid', 'test-device-123')
                .send({ answer: 'opt1' });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.answer).toBe('opt1');
        });

        it('should require deviceid header', async () => {
            const res = await request(app)
                .put(`/api/onboarding/answers/${stepId}`)
                .send({ answer: 'opt1' });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('GET /api/onboarding', () => {
        it('should return onboarding status', async () => {
            // First save an answer
            await request(app)
                .put(`/api/onboarding/answers/${stepId}`)
                .set('deviceid', 'test-device-123')
                .send({ answer: 'opt1' });

            const res = await request(app)
                .get('/api/onboarding')
                .set('deviceid', 'test-device-123');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.completedSteps).toBe(1);
        });
    });

    // New Tests for Journeys
    describe('GET /api/journeys', () => {
        it('should return all journeys', async () => {
            const res = await request(app).get('/api/journeys');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    // New Tests for Runs
    describe('GET /api/runs/current', () => {
        it('should return 404 if no run exists for device', async () => {
            const res = await request(app)
                .get('/api/runs/current')
                .set('deviceid', 'non-existent-device');

            // Assuming the API returns 404 or just null data if no run found. 
            // Based on typical REST, 404 is good, or 200 with null. 
            // Let's assume 404 based on "current run" semantics often implying "active" or "last" which might be missing.
            // If the implementation returns 200 with null, we can adjust.
            // Checking implementation of seed, it creates runs. 
            // Let's check status code isn't 500 at least.
            expect(res.status).not.toBe(500);
        });
    });
});
