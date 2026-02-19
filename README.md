# Sports & Fitness Backend

This is the backend for the Sports & Fitness application, built with Node.js, Express, TypeScript, and MongoDB.

## Improvements & Assumptions
-   **Authentication**: Implemented a lightweight auth using `deviceid` header as per requirements.
-   **Database**: Uses MongoDB with Mongoose.

## 🏗️ Modular Architecture
The project has been refactored into a Domain-Driven Design (DDD) inspired modular architecture.
- `src/modules/content`: External content logic.
- `src/modules/journey`: Journey and Favorites logic.
- `src/modules/run`: Running activity logic.
- `src/modules/onboarding`: User onboarding steps and answers.

## 📚 API Documentation (Swagger)
The API is documented using Swagger/OpenAPI.
- **URL**: `http://localhost:5000/api-docs`
- Describes all endpoints, parameters, and schemas.

## 🛡️ Security
- **Rate Limiting**: Limits requests to 100 per 15 minutes per IP.
- **Helmet**: Adds secure HTTP headers.

## 🐳 Docker Support
You can run the entire stack (App + MongoDB) using Docker Compose.

### Build and Run
```bash
docker-compose up --build
```

The API will be available at `http://localhost:5000`.

## 🧪 Testing
Includes integration tests using Jest, Supertest, and `mongodb-memory-server` for isolated testing.
-   **Type Safety**: Full TypeScript implementation with Mongoose types (using `ts-nocheck` in controller where strict type conflict occurred with Mongoose versions).
-   **Resilience**: Automatically falls back to an in-memory MongoDB instance if a local MongoDB connection cannot be established during development.

## Getting Started

1.  **Install**: `npm install`
2.  **Seed**: `npm run seed` (Requires running MongoDB, or will skip if using in-memory fallback)
3.  **Run**: `npm run dev` (Will use local MongoDB or fall back to in-memory)
4.  **Test**: `npm test`

## API Endpoints

### Onboarding
-   `GET /api/steps`: Get all onboarding steps.
-   `PUT /api/onboarding/answers/:stepId`: Save an answer for a step.
-   `GET /api/onboarding`: Get current onboarding progress.

### Journeys
-   `GET /api/journeys`: Get all journeys.
-   `GET /api/journeys/:id`: Get a single journey.
-   `POST /api/journeys/:id/favorite`: Favorite a journey.
-   `DELETE /api/journeys/:id/favorite`: Unfavorite a journey.

### Runs
-   `GET /api/runs/current`: Get the most recent run.
-   `GET /api/runs/:id`: Get a specific run.
-   `GET /api/runs/:id/route`: Get route data for a run.

### Content
-   `GET /api/content/placeholder`: Fetch content from external source.
