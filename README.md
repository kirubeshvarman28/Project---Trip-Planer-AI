# Anti-Gravity AI Trip Planner 🚀

A modern full-stack web application designed with an "Anti-Gravity" UI to help users generate AI-powered travel itineraries and collaborate in real-time.

## Features
- **Anti-Gravity UI**: Built with Next.js, TailwindCSS, and Framer Motion for floating glassmorphism aesthetics and smooth transitions.
- **AI Itinerary Generation**: Powered by OpenAI (`gpt-3.5-turbo`) to craft personalized day-by-day trips based on duration, budget, and interests.
- **Real-Time Collaboration**: Socket.io integration permits users in the same trip room to instantly see updates to the itinerary.
- **Interactive Map**: Mapbox integration visualizes the trip route and daily locations.

## Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- OpenAI API Key
- Mapbox Access Token
- Google OAuth credentials

---

## Local Development Setup

### 1. Backend Setup
1. Open a terminal and navigate to `. /backend`
2. Run `npm install`
3. Create a `.env` file in `/backend` with:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ai-trip-planner
   OPENAI_API_KEY=your_openai_api_key_here
   CLIENT_URL=http://localhost:3000
   ```
4. Start the development server: `npm run dev` (Ensure MongoDB is running locally or use an Atlas URI).

### 2. Frontend Setup
1. Open a terminal and navigate to `. /frontend`
2. Run `npm install`
3. Create a `.env.local` file in `/frontend` with:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the frontend: `npm run dev`
5. Visit `http://localhost:3000`

---

## Deployment Instructions

### Backend (Render, Railway, or Heroku)
1. Push your backend code to a GitHub repository.
2. Link the repository to your PaaS provider (e.g., Render).
3. Set the build command to `npm install && npx tsc`.
4. Set the start command to `node dist/index.js`.
5. Add all the environment variables (`MONGO_URI`, `OPENAI_API_KEY`, `CLIENT_URL`) in the provider's dashboard.
6. Note the deployed URL to be used as `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SOCKET_URL` in the frontend deployed environment.

### Frontend (Vercel)
1. Push your frontend code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and create a new project from your repository.
3. The Vite/Next.js build settings will be auto-detected.
4. Add your Environment Variables (`NEXT_PUBLIC_MAPBOX_TOKEN`, etc.) in the Vercel dashboard.
5. Click **Deploy**.
6. Once deployed, update your backend's `CLIENT_URL` env variable to match the deployed Vercel domain to ensure CORS and Socket.io accept the connection.
