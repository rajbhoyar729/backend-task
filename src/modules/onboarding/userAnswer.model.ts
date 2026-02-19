import mongoose, { Document, Schema } from 'mongoose';

export interface IUserAnswer extends Document {
    deviceId: string;
    stepId: string;
    answer: string | string[]; // Can be a single value or an array of values
    textDetails?: string; // For Step 6 optional details
}

const UserAnswerSchema: Schema = new Schema({
    deviceId: { type: String, required: true, index: true },
    stepId: { type: String, required: true },
    answer: { type: Schema.Types.Mixed, required: true },
    textDetails: { type: String, maxlength: 250 },
}, { timestamps: true });

// Ensure one answer per step per device
UserAnswerSchema.index({ deviceId: 1, stepId: 1 }, { unique: true });

export default mongoose.model<IUserAnswer>('UserAnswer', UserAnswerSchema);
