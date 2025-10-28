# VIT Chennai AI Assistant - Setup & Running Guide

## 🚀 Complete Setup Instructions

This guide will help you connect and run both the RAG backend and the React frontend together.

---

## Prerequisites

- **Python 3.8+** installed
- **Node.js 18+** and **npm/bun** installed
- **Weaviate Cloud account** (or local instance)
- **Google Gemini API key**

---

## Part 1: Backend Setup (RAG Model)

### 1. Navigate to Backend Directory
```bash
cd Backend
```

### 2. Create Python Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
# OR
venv\Scripts\activate  # On Windows
```

### 3. Install Dependencies
```bash
pip install -r ../requirements.txt
```

### 4. Create Backend .env File
Create a `.env` file in the `Backend` directory with:

```env
# Weaviate Configuration
WEAVIATE_URL=your-weaviate-cluster-url
WEAVIATE_API_KEY=your-weaviate-api-key

# Gemini Configuration
GEMINI_API_KEY=your-google-gemini-api-key
GEMINI_MODEL=gemini-1.5-flash
```

**Note:** Replace the placeholder values with your actual credentials.

### 5. Run the Backend Server
```bash
cd app
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### 6. Test Backend API
Open another terminal and test:
```bash
curl http://localhost:8000/
# Expected: {"status":"ok","message":"VIT Chennai AI Assistant API is running"}
```

Test the retrieve endpoint:
```bash
curl -X POST http://localhost:8000/retrieve/ \
  -H "Content-Type: application/json" \
  -d '{"query": "What are the hostel facilities?"}'
```

---

## Part 2: Frontend Setup (React UI)

### 1. Navigate to Frontend Directory
Open a **new terminal** and:
```bash
cd Frontend
```

### 2. Install Dependencies
```bash
npm install
# OR if using bun
bun install
```

### 3. Verify .env File
The `.env` file should already exist with:
```env
VITE_API_URL=http://localhost:8000
```

### 4. Run the Frontend Development Server
```bash
npm run dev
# OR
bun run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 5. Open in Browser
Navigate to: **http://localhost:8080/**

---

## 🎯 Quick Start Script

### Option 1: Manual (Recommended for First Time)
Follow the steps above in two separate terminals.

### Option 2: Use the Startup Script

Create a file `start.sh` in the project root:

```bash
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting VIT Chennai AI Assistant${NC}\n"

# Start Backend
echo -e "${GREEN}📡 Starting Backend Server...${NC}"
cd Backend
source venv/bin/activate
cd app
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ../..

# Wait for backend to start
sleep 3

# Start Frontend
echo -e "${GREEN}🎨 Starting Frontend Server...${NC}"
cd Frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo -e "\n${BLUE}✅ Both servers are running!${NC}"
echo -e "Backend: http://localhost:8000"
echo -e "Frontend: http://localhost:8080"
echo -e "\nPress Ctrl+C to stop both servers"

# Wait for user interrupt
wait $BACKEND_PID $FRONTEND_PID
```

Make it executable and run:
```bash
chmod +x start.sh
./start.sh
```

---

## 🔍 Testing the Connection

### 1. Check Backend Status
- Visit: http://localhost:8000/
- Should see: `{"status":"ok","message":"VIT Chennai AI Assistant API is running"}`

### 2. Check Frontend
- Visit: http://localhost:8080/
- You should see the VIT Chennai AI Assistant interface

### 3. Test the Full Flow
1. Click on a suggested prompt or type a question
2. Watch the typing indicator appear
3. See the AI response with sources
4. Click on sources to expand details

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "unable to fetch weaviate api/url"**
- Check your `Backend/.env` file has correct `WEAVIATE_URL` and `WEAVIATE_API_KEY`

**Error: "GOOGLE_API_KEY/MODEL SELECTION not found"**
- Check your `Backend/.env` file has `GEMINI_API_KEY` and `GEMINI_MODEL`

**Port 8000 already in use:**
```bash
lsof -ti:8000 | xargs kill -9  # macOS/Linux
# OR change port in uvicorn command: --port 8001
```

### Frontend Issues

**Error: "Unable to connect to the server"**
- Ensure backend is running on http://localhost:8000
- Check CORS is enabled (already added in main.py)
- Verify `Frontend/.env` has correct `VITE_API_URL`

**Port 8080 already in use:**
- Edit `Frontend/vite.config.ts` and change port
- Update `Backend/app/main.py` CORS allowed origins

**Blank page or errors:**
```bash
cd Frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📁 Project Structure

```
VITC_ChatBot_frontend/
├── Backend/                    # FastAPI + RAG Backend
│   ├── app/
│   │   ├── main.py            # FastAPI app with CORS
│   │   ├── routers/
│   │   │   └── retrieve.py    # /retrieve/ endpoint
│   │   ├── schemas.py         # Request/Response models
│   │   └── utils/
│   │       └── rag_adaptor.py # RAG bridge
│   ├── WeaviateGeminiInterface/
│   │   ├── RAG_CORE.py        # Main RAG logic
│   │   ├── gemini_handler.py  # Gemini AI integration
│   │   ├── weaviate_handler.py # Vector DB operations
│   │   └── pdf_processor.py   # Document processing
│   └── .env                    # Backend environment variables
│
├── Frontend/                   # React + TypeScript Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── Chat.tsx       # Main chat interface
│   │   ├── components/
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── ...
│   │   ├── lib/
│   │   │   └── api.ts         # API client (Axios)
│   │   └── types/
│   │       └── chat.ts        # TypeScript interfaces
│   └── .env                    # Frontend environment variables
│
└── requirements.txt            # Python dependencies
```

---

## 🔄 API Flow

```
User types question in Frontend
         ↓
Frontend sends POST /retrieve/
         ↓
Backend (FastAPI) receives request
         ↓
RAG_CORE.query() processes question
         ↓
Weaviate retrieves relevant chunks
         ↓
Gemini generates answer
         ↓
Backend returns {answer, sources}
         ↓
Frontend displays response + sources
```

---

## 🎨 Features

- ✅ Real-time chat interface
- ✅ AI responses with source citations
- ✅ Markdown rendering (bold, lists, tables, code)
- ✅ Copy to clipboard functionality
- ✅ Suggested prompts for quick start
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states and error handling
- ✅ Chat history in localStorage
- ✅ Dark mode support (if enabled)

---

## 🔒 Security Notes

- Never commit `.env` files to Git
- Keep API keys secure
- Use environment variables for sensitive data
- CORS is configured for localhost only (update for production)

---

## 📝 Customization

### Change API Port
**Backend:** Edit uvicorn command `--port 8000`
**Frontend:** Update `Frontend/.env` → `VITE_API_URL`

### Add More CORS Origins
Edit `Backend/app/main.py` → `allow_origins` list

### Change Frontend Port
Edit `Frontend/vite.config.ts` → `server.port`

---

## 🚀 Production Deployment

### Backend
- Use production ASGI server (Gunicorn + Uvicorn)
- Set proper CORS origins (your domain)
- Use HTTPS
- Environment variables via hosting platform

### Frontend
- Build: `npm run build`
- Deploy `dist/` folder to hosting (Vercel, Netlify, etc.)
- Update `VITE_API_URL` to production backend URL

---

## 📞 Support

For issues or questions:
1. Check logs in both terminal windows
2. Verify all environment variables are set
3. Ensure both servers are running
4. Check browser console for frontend errors

---

## ✅ Success Checklist

- [ ] Backend .env file created with all keys
- [ ] Python virtual environment activated
- [ ] Backend dependencies installed
- [ ] Backend server running on port 8000
- [ ] Backend API responds to test requests
- [ ] Frontend .env file exists
- [ ] Frontend dependencies installed
- [ ] Frontend server running on port 8080
- [ ] Can type questions and get AI responses
- [ ] Sources are displayed correctly

**If all checked, you're ready to go! 🎉**
