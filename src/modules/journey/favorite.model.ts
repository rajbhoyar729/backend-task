import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorite extends Document {
    deviceId: string;
    journeyId: mongoose.Schema.Types.ObjectId;
}

const FavoriteSchema: Schema = new Schema({
    deviceId: { type: String, required: true, index: true },
    journeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Journey', required: true },
}, { timestamps: true });

FavoriteSchema.index({ deviceId: 1, journeyId: 1 }, { unique: true });

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);
