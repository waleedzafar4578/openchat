import { useContext } from "react";
import './components.css';
import { WebSocketContext } from "../context/WsContext";

function UserProfile() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("[Error] WebSocket values is not provided!")
  }
  const { userName } = context;
  return (
    <div className="user-name-container">
      <p className="user-name-item">{userName}</p>
    </div>
  )
}
export default UserProfile;
