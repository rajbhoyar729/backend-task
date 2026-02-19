import axios from 'axios';

class ContentService {
    private readonly PLACEHOLDER_API = 'https://jsonplaceholder.typicode.com/posts';

    /**
     * Fetches and normalizes external content.
     */
    async fetchContent() {
        try {
            const response = await axios.get(this.PLACEHOLDER_API);
            // Normalize data to a UI-friendly shape
            return response.data.slice(0, 5).map((item: any) => ({
                id: item.id,
                title: item.title,
                description: item.body,
                image: `https://picsum.photos/seed/${item.id}/300/200` // Placeholder image
            }));
        } catch (error) {
            throw new Error('Failed to fetch external content');
        }
    }
}

export default new ContentService();
