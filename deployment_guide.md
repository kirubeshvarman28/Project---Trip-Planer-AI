# 🚀 Free Deployment Guide: Anti-Gravity AI Trip Planner

Follow these steps to host your project online for free.

## Step 1: External Services Setup
You need three external accounts to power the AI and database:

1.  **MongoDB Atlas (Database)**:
    *   Create a free account at [mongodb.com](https://www.mongodb.com/cloud/atlas).
    *   Create a "Shared Cluster" (Free).
    *   In **Database Access**, create a user with a password.
    *   In **Network Access**, "Allow Access from Anywhere" (0.0.0.0/0).
    *   Get your **Connection String** (URI).
2.  **OpenAI (AI Engine)**:
    *   Get your API Key from [platform.openai.com](https://platform.openai.com/).
---

## Step 2: Push to GitHub
1.  Initialize a Git repo if you haven't: `git init`
2.  Commit your code: `git add . && git commit -m "initial commit"`
3.  Create a new repository on [GitHub](https://github.com/) and push your code.

---

## Step 3: Backend Deployment (Render.com)
*Render is great for free Node.js hosting.*

1.  Log in to [Render](https://render.com/) and create a **New + > Web Service**.
2.  Connect your GitHub repo.
3.  **Settings**:
    *   **Root Directory**: `backend`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm run build`
    *   **Start Command**: `npm start`
4.  **Environment Variables**:
    *   `PORT`: `5000`
    *   `MONGO_URI`: (Your MongoDB Atlas connection string)
    *   `OPENAI_API_KEY`: (Your OpenAI key)
    *   `CLIENT_URL`: (Wait for Step 4 to get your Vercel URL, then update this)

---

## Step 4: Frontend Deployment (Vercel)
*Vercel is the best home for Next.js apps.*

1.  Log in to [Vercel](https://vercel.com/) and "Import" your GitHub repo.
2.  **Settings**:
    *   **Root Directory**: `frontend`
    *   **Framework Preset**: `Next.js`
3.  **Environment Variables**:
    *   (No Mapbox token needed! Leaflet is 100% free).
    *   `NEXT_PUBLIC_SOCKET_URL`: (Your Render backend URL, e.g., `https://backend-xyz.onrender.com`)
    *   `NEXT_PUBLIC_API_URL`: (Your Render backend URL + `/api`, e.g., `https://backend-xyz.onrender.com/api`)
4.  Click **Deploy**.

---

## Step 5: Final Connection (Crucial!)
1.  Copy your **Vercel URL** (e.g., `https://anti-gravity-web.vercel.app`).
2.  Go back to your **Render Dashboard** (Backend service).
3.  Go to **Environment Variables** and update `CLIENT_URL` with your Vercel URL.
4.  Render will auto-redeploy. Once done, your site is live!

> [!TIP]
> **Cold Starts**: Free tier services (especially Render) go to "sleep" after inactivity. The first time you visit the site after a while, the backend might take 30-60 seconds to wake up.
