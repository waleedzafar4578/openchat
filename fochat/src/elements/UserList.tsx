import { useState, useEffect } from "react";
import { connectWebSocket } from "../services/chat";


interface User {
  color: string;
  name: string;
}
function UserList() {

  const [users, setUsers] = useState<any | null>(null);
  useEffect(() => {
    console.log("[Userlist][useEffect]")
    connectWebSocket((user) => {
     setUsers((prev: any) => [...prev, user])
    });

  }, []);
  return (
    <div className="user-container">
      {users != null && (
        <ul>
          {users.map((user, index) => (
            <li key={index} style={{ backgroundColor: "#fff" }} className="single-user">
              {user}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


export default UserList;
