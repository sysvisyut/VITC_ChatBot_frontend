from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import retrieve, user

app = FastAPI(title="VIT Chennai AI Assistant API", version="1.0.0")

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",  # Frontend dev server
        "http://127.0.0.1:8080",
        "http://localhost:5173",  # Alternative Vite port
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def test_server():
    return {"status": "ok", "message": "VIT Chennai AI Assistant API is running"}

app.include_router(retrieve.router)