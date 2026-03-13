# AI Trip Planner Web App

This document outlines the technical implementation plan for the **AI Trip Planner Web App** featuring an **Anti-Gravity floating interface design** and **real-time collaboration features**.

## User Review Required
> [!IMPORTANT]
> - Since this app integrates with OpenAI, MongoDB, and Mapbox, you will need to provide API keys locally for it to function completely. 
> - For authentication with Google OAuth, we will need OAuth credentials from the Google Cloud Console.

## Proposed Architecture

This will be a monorepo setup with separate frontend and backend directories.

### Backend (`/backend`)
- **Node.js, Express**: Serving RESTful API endpoints and authenticating users.
- **MongoDB + Mongoose**: Storing Trip data (itinerary, budget, locations) and User profiles.
- **Socket.io**: Enabling real-time syncing of trips for collaborative planning.
- **OpenAI API Integration**: Generating the initial day-by-day itinerary given user constraints (budget, interests, duration).

### Frontend (`/frontend`)
- **Next.js (App Router) + React**: Full-stack framework for UI and routing.
- **TailwindCSS**: Core styling structure, configured with specific palette for modern dark UI and glassmorphism techniques.
- **Framer Motion**: Powering the "Anti-Gravity" floating aesthetics, smooth transitions, parallax scrolling, and drag-and-drop elements on the itinerary cards.
- **Mapbox API**: Interactive map pane to display the generated itinerary route and location markers.

## Development Phases

### Phase 1: Setup & Initialization
1. Initialize the root directory, configure `.gitignore`.
2. Generate Next.js frontend in `/frontend`. Add TailwindCSS and Framer Motion dependencies.
3. Initialize Express backend in `/backend`. Install `mongoose`, `socket.io`, `express`, `openai`.

### Phase 2: Backend Development
1. **Database Schema**: Define `User` and `Trip` Mongoose models. `Trip` will store days, locations, budget info, and collaborators.
2. **REST API**: Implement endpoints to generate trips (calls OpenAI), fetch trips, invite collaborators.
3. **Socket Event Handlers**: Create real-time events for updating the itinerary array, budget, and map markers among connected users.

### Phase 3: Frontend Development
1. **Anti-Gravity Design System**: Set up utility classes for floating animations, glassmorphism, and gradient backgrounds.
2. **Dashboard & Trip Generation**: Interface for users to input destination, budget, and interests to generate a new trip.
3. **Interactive Workspace**: Split view workspace: left pane for floating itinerary cards (draggable/editable), right pane for Mapbox rendering.
4. **Real-time Syncing**: Hook up Socket.io client to broadcast and receive updates for itinerary changes.

### Phase 4: Polish & Extra Features
1. Responsive design checking across mobile viewports.
2. Weather API and local event suggestions based on dates/locations of the trip.
