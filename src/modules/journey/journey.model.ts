import mongoose, { Document, Schema } from 'mongoose';

export interface IJourney extends Document {
    title: string;
    description: string;
    imageUrl?: string;
    content?: string;
}

const JourneySchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    content: { type: String },
}, { timestamps: true });

export default mongoose.model<IJourney>('Journey', JourneySchema);
