import { useState } from "react";
import "./components.css"
import type { ChangeEvent } from "react";

function UserLogin() {
  const [userName, setUserName] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
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
        <button onClick={() => {
          if (userName.length > 4) {
            localStorage.setItem("userInfo", userName);
            location.reload()
          }
        }}>Submit</button>
      </div>
    </div>
  );
}
export default UserLogin; 
