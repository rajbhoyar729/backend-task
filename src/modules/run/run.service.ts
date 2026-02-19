import Run, { IRun } from './run.model';

class RunService {
    /**
     * Get the most recent run for a device
     */
    async getCurrentRun(deviceId: string): Promise<IRun | null> {
        return await Run.findOne({ deviceId }).sort({ startTime: -1 });
    }

    /**
     * Get a run by ID
     */
    async getRunById(id: string): Promise<IRun | null> {
        return await Run.findById(id);
    }

    /**
     * Get route data for a run
     */
    async getRunRoute(id: string): Promise<any | null> {
        const run = await Run.findById(id).select('route');
        return run ? run.route : null;
    }
}

export default new RunService();
