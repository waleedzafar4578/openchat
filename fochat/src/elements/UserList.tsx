import { useState, useEffect } from "react";

interface User {
  color: string;
  name: string;
}
function UserList() {
  const [userlist, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const users: User[] = Array.from(
      { length: 20 }, (_, i) => ({
        name: `User ${i + 1}`,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      })
    );

    setUserList(users)
  }, []);
  return (
    <div className="user-container">
      <ul>
        {userlist.map((user, index) => (
          <li key={index} style={{ backgroundColor: user.color }} className="single-user">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}


export default UserList;
