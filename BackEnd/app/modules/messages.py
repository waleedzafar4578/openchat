from pydantic import BaseModel
from datetime import datetime

class MessageOut(BaseModel):
    id: int
    sms: str
    created_at: datetime

