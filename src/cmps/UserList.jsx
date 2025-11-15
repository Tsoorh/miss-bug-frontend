import { useEffect, useState } from "react";
import { userService } from "../services/user/user.service.js";
import { UserPreview } from "./UserPreview";

export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await userService.query();
    setUsers(data);
  }

  async function removeUser(userId) {
    try {
      const response = await userService.remove(userId);
      setUsers(prevUsers=>(prevUsers.filter(user=>user._id !== userId)));
    } catch (err) {
      console.log(err);
    }
  }

  if (users.length < 1) return <p>"no users to display"</p>;
  return (
    <section>
      <ul className="bug-list">
        {users.map((user) => {
          return (
            <UserPreview user={user} key={user._id} removeUser={removeUser} />
          );
        })}
      </ul>
    </section>
  );
}
