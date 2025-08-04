import { useState, useEffect, useContext } from "react";
import "./components.css"
import type { ChangeEvent } from "react";
import { connected_userlist } from "../services/chat";
import { WebSocketContext } from "../context/WsContext";

function UserLogin() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("[Error] WebSocket Values is not provided!")
  }
  const { setUserLogin } = context;
  const [userName, setUserName] = useState("");
  const [userList, setUserList] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }
  useEffect(() => {
    const fetch_user = async () => {
      const response = await connected_userlist();
      setUserList(response)
    }

    fetch_user()
  }, []);
  const login = () => {
    if (userName.length > 4) {
      if (userList.includes(userName)) {
        alert("This name already used!")
      } else {
        setUserLogin(userName);
      }
    }else{
      alert("UserName length must be greater then 4!")
    }

  }

  return (
    <div className="userlogin-container">
      <div className="userlogin-form">
        <input
          placeholder="Enter Name"
          value={userName}
          onChange={handleChange}
          className="input-bar-user"
        />
        <button onClick={login} > Submit</button>
      </div>
    </div >
  );
}
export default UserLogin; 
