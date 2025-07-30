import { useState, useEffect, ChangeEvent } from "react";
import './components.css';
import React from "react";
function UserProfile() {
  const [userName, setUserName] = useState<string | null>(null);
  useEffect(() => {
    let name = localStorage.getItem("userInfo");
    setUserName(name != null ? name : null)
  }, []);
  return (
    <div className="user-name-container">
      <p>{userName !== null ? userName : "temp"}</p>
    </div>
  )
}
export default UserProfile;
