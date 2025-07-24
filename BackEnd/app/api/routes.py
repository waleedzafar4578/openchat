from fastapi import APIRouter
from app.db.queries import get_messages, post_sms
from app.modules.APIResponse import APIResponse

router = APIRouter()


@router.get("/get", response_model=APIResponse)
async def fetch_messages(message_no: int, dateIndex: int):
    return APIResponse(
        status="success",
        message="Data fetched",
        data=get_messages(message_no, dateIndex),
    )


@router.get("/send", response_model=APIResponse)
async def send_sms(userSms: str):
    return post_sms(userSms)
