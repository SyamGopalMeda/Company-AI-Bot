# Enterprise AI Knowledge Platform

A fully automated, zero-configuration AI Chatbot generator. This platform automatically crawls a company's website, cleans the text, and feeds it into an advanced AI Language Model to generate an instant, perfectly-knowledgeable virtual assistant.

## Features
- **Intelligent Crawler:** Automatically traverses a domain up to a specified depth to ingest all public knowledge.
- **Strict Context Enforcement:** AI cannot hallucinate; it strictly answers using the scraped Knowledge Base.
- **Enterprise UI Pipeline:** Clean, modern React dashboard that tracks scraping progress in real-time.
- **Local File Storage:** Scraped knowledge is securely stored on your local disk inside `backend/Knowledge Base`.

## Prerequisites
- Node.js (v18+)
- A Gemini API Key from Google AI Studio.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd "Enterprise AI Knowledge Platform"
   ```

2. **Configure Environment:**
   In the `backend` folder, create a `.env` file:
   ```env
   PORT=3001
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

3. **Install Dependencies & Start Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The backend server will run on `http://localhost:3001`.

4. **Install Dependencies & Start Frontend:**
   Open a new terminal.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## Usage
1. Open the frontend in your browser.
2. Enter your **Company Name**.
3. Input your target **Website URL** in the Scraper page.
4. Watch the real-time **Progress** as the crawler traverses the site.
5. Verify the extracted markdown in the **Knowledge Base Viewer**.
6. Switch to the **AI Chat** tab to interact with your newly trained virtual assistant!
