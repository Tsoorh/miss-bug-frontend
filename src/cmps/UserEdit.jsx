import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userService } from "../services/user/user.service";
import { useNavigate } from "react-router";

export function UserEdit() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    fullname:"",
    username:"",
    password:"",
    score:0
});
  const navigate = useNavigate();
  
  useEffect(() => {
    loadUser();
  }, [userId]);

  async function loadUser() {
    const data = await userService.getByID(userId);
    setUser(data);
  }

  async function handleSaveBtn(ev) {
    ev.preventDefault();
    const response = await userService.save(user);
    console.log(userId + " saved");
    console.log("🚀 ~ handleSaveBtn ~ response:", response)
    navigate("/user")
  }

  function onHandleChange(ev) {
    const { name,value } = ev.target;
    setUser(prev=>({
      ...prev,[name] : value  
    }))
  }

  if (!user) return <p>loading....</p>;
  return (
    <>
    <h1 className="flex justify-center">Edit user</h1>
    <form className="flex flex-column edit-form">
      <div>
        <label htmlFor="fullname">Fullname </label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={user.fullname}
          onChange={onHandleChange}
        />
      </div>
      <div>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={onHandleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={onHandleChange}
        />
      </div>
      <div>
        <label htmlFor="score">Score </label>
        <input
          type="number"
          name="score"
          id="score"
          value={user.score}
          onChange={onHandleChange}
        />
      </div>
      <div className="flex space-around">
      <button onClick={()=>navigate("/user")}>Back</button>
      <button onClick={handleSaveBtn}>Save</button>
      </div>
    </form>
    </>

  );
}
