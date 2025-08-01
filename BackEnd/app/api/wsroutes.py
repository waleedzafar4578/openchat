# Imports from FastApi.
# ApiRouter use for create router object.
# WebSocket use for create socket endpoint.
# WebSocket use for check if user disconnect then do cleaning things.
# Jsonable_encoder use for convert simple basemodel to json object.
# MessageOut is structure for single sms to send to client.
# datetime use for do operation on datetime object.
# json use for parse that object which come from the client.
# get_db_connection  for write on database.
# get logger for debug the app working.
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.encoders import jsonable_encoder
from app.modules.messages import MessageOut
from datetime import datetime
import json
from app.db.sessions import get_db_connection
from app.utils.logging import getLogger

# Create the Router for config the endpoints the address.
ws_router = APIRouter()

# Create logger handle for call there functions.
show = getLogger()

# This is sms chache which is store 5 sms then flush into the database
sms_chache = []


# This is fucntion which use for store sms in chache.
def chache_sms(user_name: str, sms_text: str, date: str):
    show.info(f"[SMSChache] call with the values:{
              user_name}-{sms_text}-{date}")
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

    # Get database connection.
    # Make cursor for this connection.
    con = get_db_connection()
    cur = con.cursor()

    show.info(f"[flush_into_Databse] {query} - {values}")
    # Execute the query on database with parameter values list.
    # After run this commit to the database.
    cur.executemany(query, values)
    con.commit()

    # Close the cursor and then close the connection.
    cur.close()
    con.close()

    # After flush in the database clean the sms chache.
    sms_chache.clear()


# User Sessions use for store all users which connected with websocket.
user_sessions = {}

# Chat socket provide users to communicate with all others.Kind of group chat.


@ws_router.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket):
    # Accept the socket request then fetch userinfo for check if this user already connect or not.
    # If user come first time then store his name along socket address.
    await websocket.accept()
    userName = websocket.query_params.get("userInfo")
    show.info(f"[Chat Socket] User Connected with name of {userName}")
    if userName in user_sessions.keys():
        show.info("[Chat socket] User already in this session.")
        pass
    elif userName == "null":
        show.info("[Error] UserName with null not allowed!")
        return
    else:
        show.info(f"[Chat Socket]  Socket created for {userName}. ")
        user_sessions[userName] = websocket

    await send_user_list()
    # Then user come in loop it send and recieve text in this loop.Until user disconnect then loop break and flush the sms into database.Then remove that client from the user sessions.
    try:
        while True:
            data_str = await websocket.receive_text()
            show.info(f"[Chat socket loop] Reciev SMS from user with socket {
                      websocket} which related to the username: {userName} data which revieve:{data_str}")
            data = json.loads(data_str)
            chache_sms(userName, data['sms'], datetime.today())
            if len(user_sessions) < 2 or len(sms_chache) >= 3:
                flush_sms_to_db()
            data = MessageOut(
                name=userName,
                sms=data['sms'],
                created_at=datetime.today()
            )
            response = {
                "type": "messages",
                "data": data
            }
            for user in user_sessions:
                await user_sessions[user].send_json(jsonable_encoder(response), mode="text")
    except WebSocketDisconnect:
        flush_sms_to_db()
        show.info(f"{userName}: client disconnected!")
        if userName in user_sessions.keys():
            user_sessions.pop(userName)
        await send_user_list()


async def send_user_list():
    username_list = list(user_sessions.keys())
    response = {
        "type": "userList",
        "data": username_list
    }
    for user in user_sessions:
        await user_sessions[user].send_json(jsonable_encoder(response), mode="text")

    show.info("[Send User List] send user name list to all connected user.")
