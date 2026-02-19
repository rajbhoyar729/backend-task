import mongoose, { Document, Schema } from 'mongoose';

export interface ICoordinate {
    latitude: number;
    longitude: number;
}

export interface IRun extends Document {
    deviceId: string;
    startTime: Date;
    endTime: Date;
    distance: number; // in meters
    duration: number; // in seconds
    calories: number;
    route: ICoordinate[];
}

const RunSchema: Schema = new Schema({
    deviceId: { type: String, required: true, index: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    route: [
        {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
    ],
}, { timestamps: true });

export default mongoose.model<IRun>('Run', RunSchema);
