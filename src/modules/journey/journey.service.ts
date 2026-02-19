import mongoose from 'mongoose';
import Journey, { IJourney } from './journey.model';
import Favorite, { IFavorite } from './favorite.model';

class JourneyService {
    /**
     * Get all journeys
     */
    async getAllJourneys(): Promise<IJourney[]> {
        return await Journey.find();
    }

    /**
     * Get a journey by ID
     */
    async getJourneyById(id: string): Promise<IJourney | null> {
        return await Journey.findById(id);
    }

    /**
     * Favorite a journey
     */
    async favoriteJourney(deviceId: string, journeyId: string): Promise<IFavorite | null> {
        const journey = await Journey.findById(journeyId);
        if (!journey) {
            return null;
        }

        const objectJourneyId = new mongoose.Types.ObjectId(journeyId);

        // Using upsert to prevent duplicates logic if not handled by unique index race condition
        // But also returning the doc.
        // We need to cast to any or correct type because Mongoose types can be strict.
        const favorite = await Favorite.findOneAndUpdate(
            { deviceId, journeyId: objectJourneyId },
            { deviceId, journeyId: objectJourneyId },
            { upsert: true, new: true }
        );
        return favorite;
    }

    /**
     * Unfavorite a journey
     */
    async unfavoriteJourney(deviceId: string, journeyId: string): Promise<void> {
        const objectJourneyId = new mongoose.Types.ObjectId(journeyId);
        await Favorite.findOneAndDelete({ deviceId, journeyId: objectJourneyId });
    }
}

export default new JourneyService();
