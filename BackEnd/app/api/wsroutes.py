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


def chache_sms(user_name: str, sms_text: str, date: str):
    sms_chache.append({
        "name": user_name,
        "sms": sms_text,
        "created_at": date
    })

# This fucntion use for flush the sms into database.


def flush_sms_to_db():
    if not sms_chache:
        return

    query = """
      INSERT INTO messages(name,sms,created_at) VALUES (%s,%s,%s);
    """

    values = [(i["name"], i["sms"], i["created_at"]) for i in sms_chache]

    con = get_db_connection()
    cur = con.cursor()
    cur.executemany(query, values)
    con.commit()
    cur.close()
    con.close()
    sms_chache.clear()


client_list = {}
user_sessions = {}


@ws_router.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    # user = ""
    userName = websocket.query_params.get("userInfo")
    if userName in user_sessions.keys():
        # if session_id in user_sessions:
        print(f"{userName} already in user_sessions!")
        # print(user_sessions)

        # user = user_sessions.get(session_id)
        # del user_sessions[session_id]["websocket"]
    else:
        user_sessions[userName] = websocket
        # await websocket.send_json(jsonable_encoder({"type": "userInfo", "userName": userName}))
        # name = "temp"
        # user_sessions[session_id] = {
        #     "user_name": name
        # }

    try:
        while True:
            data_str = await websocket.receive_text()

            data = json.loads(data_str)

            chache_sms(userName, data['sms'], datetime.today())
            if len(sms_chache) >= 3:
                flush_sms_to_db()

            data = MessageOut(
                name=userName,
                sms=data['sms'],
                created_at=datetime.today()
            )

            # response = {
            #     "user": user_sessions.get(session_id),
            #     "data": data
            # }
            for user in user_sessions:
                # print(user_sessions.get(user))
                await user_sessions[user].send_json(jsonable_encoder(data), mode="text")
    except WebSocketDisconnect:
        flush_sms_to_db()
        print(f"{userName}: client disconnected!")
        # del client_list[client_id]
        if userName in user_sessions.keys():
            user_sessions.pop(userName)
            # del user_sessions[session_id]["websocket"]
