import { useContext } from "react";
import { WebSocketContext } from "../context/WsContext";
import "./elements.css";

function UserList() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("Websocket values not provided!");
  }
  const { allConnectUser, userName } = context;
  return (
    <div className="user-container">
      <p style={{
        color:'#D92C54'
      }}>Connected Users</p>
      {allConnectUser != null && (
        <ul>
          {allConnectUser.map((user, index) => (
            <div key={index}>
              {userName != user && (
                <li className="single-user">
                  <p>{user}</p>
                </li>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  )
}
export default UserList;
