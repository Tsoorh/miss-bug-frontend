import { useNavigate } from "react-router";

export function UserPreview({ user,removeUser }) {
  const navigate = useNavigate();

  function onRemoveUser(){
    removeUser(user._id);
  }
  return (
    <li className="bug-preview">
      <h2>User name: {user.username}</h2>
      <p>Full name: {user.fullname}</p>
      <p>Score: {user.score}</p>
        <div className="flex">
        <button onClick={() => navigate(`/user/edit/${user._id}`)}>edit</button>
        <button onClick={onRemoveUser}>remove</button>
        </div>
    </li>
  );
}
