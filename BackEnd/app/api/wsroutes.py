from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.encoders import jsonable_encoder
from app.modules.messages import MessageOut
from datetime import datetime
import json
from app.db.sessions import get_db_connection


ws_router = APIRouter()

# This is sms chache which is store 5 sms then flush into the database
sms_chache = []

# This is fucntion which use for store sms in chache


def chache_sms(sms_text: str, date: str):
    sms_chache.append({
        "sms": sms_text,
        "created_at": date
    })

# This fucntion use for flush the sms into database.


def flush_sms_to_db():
    if not sms_chache:
        return

    query = """
      INSERT INTO messages(sms,created_at) VALUES (%s,%s);
    """

    values = [(i["sms"], i["created_at"]) for i in sms_chache]

    con = get_db_connection()
    cur = con.cursor()
    cur.executemany(query, values)
    con.commit()
    cur.close()
    con.close()
    sms_chache.clear()


@ws_router.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data_str = await websocket.receive_text()

            data = json.loads(data_str)

            chache_sms(data['sms'], datetime.today())
            if len(sms_chache) >= 3:
                flush_sms_to_db()
            response = MessageOut(
                id=2,
                sms=data['sms'],
                created_at=datetime.today()
            )

            await websocket.send_json(jsonable_encoder(response), mode="text")
    except WebSocketDisconnect:
        flush_sms_to_db()
        print("client disconnected!")
