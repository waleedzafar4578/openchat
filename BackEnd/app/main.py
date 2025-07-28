from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.api.wsroutes import ws_router

app = FastAPI()

# Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# here adding custom middlewars


@app.middleware("http")
async def identify_the_user(request: Request, call_next):
    user_ip = request.client.host
    print("===========================")
    print(user_ip, request.client.port)
    print(await request.body())
    response = await call_next(request)
    return response

# Register API
app.include_router(api_router)
app.include_router(ws_router)
