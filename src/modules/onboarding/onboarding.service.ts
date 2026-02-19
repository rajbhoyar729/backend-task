import Step, { IStep } from './step.model';
import UserAnswer, { IUserAnswer } from './userAnswer.model';

class OnboardingService {
    async getAllSteps(): Promise<IStep[]> {
        return await Step.find().sort({ order: 1 });
    }

    async getStepById(stepId: string): Promise<IStep | null> {
        return await Step.findOne({ stepId });
    }

    async saveAnswer(
        deviceId: string,
        stepId: string,
        answer: any,
        textDetails?: string
    ): Promise<{ success: boolean; data?: IUserAnswer | null; error?: string; status?: number }> {
        const step = await Step.findOne({ stepId });
        if (!step) {
            return { success: false, error: 'Step not found', status: 404 };
        }

        // Basic Validation
        if (step.type === 'single-select' && Array.isArray(answer)) {
            return { success: false, error: 'Single-select step requires a single string answer', status: 400 };
        }

        if (step.type === 'multi-select' && !Array.isArray(answer)) {
            return { success: false, error: 'Multi-select step requires an array of answers', status: 400 };
        }

        if (textDetails && textDetails.length > 250) {
            return { success: false, error: 'Text details must be 250 characters or less', status: 400 };
        }

        const updatedAnswer = await UserAnswer.findOneAndUpdate(
            { deviceId, stepId },
            { answer, textDetails },
            { new: true, upsert: true }
        );

        return { success: true, data: updatedAnswer };
    }

    async getOnboardingStatus(deviceId: string): Promise<any> {
        const totalSteps = await Step.countDocuments();
        const completedAnswers = await UserAnswer.countDocuments({ deviceId });

        // Identify which steps are completed
        const answers = await UserAnswer.find({ deviceId }).select('stepId');
        const completedStepIds = answers.map((a: IUserAnswer) => a.stepId);

        return {
            totalSteps,
            completedSteps: completedAnswers, // Maintaining name as per previous implementation logic (though usage ambiguous)
            completedStepIds,                 // More useful
            isComplete: totalSteps === completedAnswers,
        };
    }
}

export default new OnboardingService();
