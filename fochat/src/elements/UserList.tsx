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
      {allConnectUser != null && (
        <ul>
          {allConnectUser.map((user, index) => (
            <div>
              {userName != user && (
                <li key={index} className="single-user">
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
