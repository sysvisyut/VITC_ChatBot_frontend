from fastapi import FastAPI
from .routers import retrieve, user

app = FastAPI()

@app.get('/')
def test_server():
    return {"status : ok"}
app.include_router(retrieve.router)