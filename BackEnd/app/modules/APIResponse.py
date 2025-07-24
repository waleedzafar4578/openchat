from pydantic import BaseModel
from typing import Any
from datetime import datetime

class APIResponse(BaseModel):
    status: str
    data: Any | None = None
    dataDate: datetime
