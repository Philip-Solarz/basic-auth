from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from routers import auth

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins="http://localhost:3000")

app.include_router(auth.router)


@app.get("/")
def root():
    return {"Hello": "World"}
