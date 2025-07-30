from pydantic import BaseModel
from datetime import datetime

class MessageOut(BaseModel):
    name: str
    sms: str
    created_at: datetime

