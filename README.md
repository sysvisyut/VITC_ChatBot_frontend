# VIT Chennai AI Assistant Chatbot

A Retrieval Augmented Generation (RAG) powered AI chatbot for Vellore Institute of Technology, Chennai. This intelligent assistant helps students and faculty access information about VIT Chennai through natural conversation.

## 🌟 Features

- **Smart RAG System**: Powered by Weaviate vector database and Google Gemini AI
- **Modern UI**: Clean, minimalist interface inspired by Grok
- **Source Citations**: Every answer includes references to source documents
- **Real-time Chat**: Instant responses with typing indicators
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Markdown Support**: Rich formatting in AI responses

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- Weaviate Cloud account (or local instance)
- Google Gemini API key

### 1. Setup Backend
```bash
cd Backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r ../requirements.txt

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your API keys
```

### 2. Setup Frontend
```bash
cd Frontend
npm install  # or: bun install
# .env file is already configured for localhost
```

### 3. Run Everything
```bash
# From project root, use the startup script:
./start.sh

# OR manually in two terminals:
# Terminal 1 - Backend:
cd Backend/app
uvicorn main:app --reload --port 8000

# Terminal 2 - Frontend:
cd Frontend
npm run dev
```

### 4. Access the Application
- **Frontend UI**: http://localhost:8080
- **Backend API**: http://localhost:8000

## 📖 Documentation

For detailed setup instructions, troubleshooting, and configuration options, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 🏗️ Architecture

```
Frontend (React + TypeScript)
    ↓ POST /retrieve/
Backend (FastAPI)
    ↓
RAG Core
    ↓
Weaviate (Vector DB) + Gemini (AI)
    ↓
Response with Sources
```

## 🛠️ Tech Stack

**Backend:**
- FastAPI (Python web framework)
- Weaviate (Vector database)
- Google Gemini (LLM)
- PyMuPDF & Camelot (PDF processing)

**Frontend:**
- React + TypeScript
- Vite (Build tool)
- Tailwind CSS + Shadcn/ui
- Axios (API client)

## 📁 Project Structure

```
├── Backend/                 # FastAPI backend with RAG
│   ├── app/                 # FastAPI application
│   │   ├── main.py         # API entry point with CORS
│   │   ├── routers/        # API endpoints
│   │   └── utils/          # Helper functions
│   └── WeaviateGeminiInterface/  # RAG core logic
│       ├── RAG_CORE.py     # Main orchestrator
│       ├── gemini_handler.py
│       ├── weaviate_handler.py
│       └── pdf_processor.py
│
├── Frontend/                # React frontend
│   ├── src/
│   │   ├── pages/          # Main pages (Chat, About, FAQ)
│   │   ├── components/     # React components
│   │   ├── lib/            # API client & utilities
│   │   └── types/          # TypeScript types
│   └── .env                # Frontend config
│
├── start.sh                 # Startup script
├── SETUP_GUIDE.md          # Detailed documentation
└── requirements.txt        # Python dependencies
```

## 🔌 API Endpoints

### `POST /retrieve/`
Send a query and get an AI-generated answer with sources.

**Request:**
```json
{
  "query": "What are the hostel facilities at VIT Chennai?"
}
```

**Response:**
```json
{
  "answer": "VIT Chennai provides excellent hostel facilities...",
  "sources": [
    {
      "text_chunk": "...",
      "source_file": "hostel_info.pdf"
    }
  ]
}
```

## 🧪 Testing

Test the backend API:
```bash
curl -X POST http://localhost:8000/retrieve/ \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me about VIT Chennai"}'
```

## 🐛 Troubleshooting

**Backend won't start?**
- Check `.env` file has all required API keys
- Verify Python virtual environment is activated
- Ensure port 8000 is not already in use

**Frontend can't connect?**
- Verify backend is running on port 8000
- Check `Frontend/.env` has correct `VITE_API_URL`
- Check browser console for CORS errors

**No AI responses?**
- Verify Weaviate connection credentials
- Check Gemini API key is valid
- Ensure PDF documents are ingested into Weaviate

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more troubleshooting tips.

## 🔒 Security

- Never commit `.env` files
- Keep API keys secure
- CORS is configured for localhost (update for production)
- Use HTTPS in production

## 📝 License

See [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

This is a college project for VIT Chennai. For issues or suggestions, please contact the development team.

---

**Made with ❤️ for VIT Chennai students and faculty**
