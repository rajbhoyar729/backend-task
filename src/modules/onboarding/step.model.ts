import mongoose, { Document, Schema } from 'mongoose';

export interface IStepOption {
    id: string;
    label: string;
    value: string;
}

export interface IStep extends Document {
    stepId: string;
    title: string;
    description?: string;
    type: 'multi-select' | 'single-select' | 'text' | 'yes-no';
    options?: IStepOption[];
    order: number;
}

const StepSchema: Schema = new Schema({
    stepId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    type: {
        type: String,
        enum: ['multi-select', 'single-select', 'text', 'yes-no'],
        required: true,
    },
    options: [
        {
            id: { type: String, required: true },
            label: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
    order: { type: Number, required: true },
});

export default mongoose.model<IStep>('Step', StepSchema);
