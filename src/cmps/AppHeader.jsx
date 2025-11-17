import { useEffect, useState } from "react";
import { UserMsg } from "./UserMsg";
import { Link, NavLink, useLocation } from "react-router-dom";
import { authService } from "../services/auth/auth.service.js";

export function AppHeader() {
  const location = useLocation();
    const [loggedinUser, setLoggedinUser] = useState(
    authService.getLoggedinUser()
  );
  useEffect(() => {
    setLoggedinUser(authService.getLoggedinUser())
  }, [location]);

  async function onLogout() {
    await authService.logout();
    setLoggedinUser(null);
  }

  return (
    <header className="app-header container">
      <div className="header-container">
        <h1>Bugs are Forever</h1>
        {loggedinUser ? (
          <div className="flex header-auth">
            <p>Hello {loggedinUser.fullname},</p>
            <Link to={`/user/${loggedinUser._id}`}>Profile</Link>
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <nav className="header-auth">
            <NavLink to="/login">Login</NavLink> |
            <NavLink to="/signup">Signup</NavLink>
          </nav>
        )}
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
          {loggedinUser?.isAdmin&&(<><NavLink to="/user">Users</NavLink> |</>)}
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
      <UserMsg />
    </header>
  );
}
