import { useEffect, useState } from "react";
import { authService } from "../services/auth/auth.service.js";
import { useNavigate, useLocation } from "react-router";

export function LoginSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [requireSignup, setRequireSignup] = useState(getUrlLocation());
  const [credantials, setCredendials] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    setRequireSignup(getUrlLocation());
  }, [location.pathname]);

  function getUrlLocation() {
    return location.pathname === "/signup";
  }

  function onChange(ev) {
    const { name, value } = ev.target;

    setCredendials((prevCred) => ({
      ...prevCred,
      [name]: value,
    }));
  }

  async function onHandleSubmit(ev) {
    ev.preventDefault();
    try {
      if (requireSignup) {
        await authService.signup(credantials);
        navigate("/");
      } else {
        await authService.login(credantials.username, credantials.password);
        navigate("/");
      }
    } catch (err) {
      console.log("🚀 ~ onHandleSubmit ~ err:", err);
    }
  }

  function onChangeForm(ev) {
    ev.preventDefault();
    setRequireSignup((prev) => !prev);
  }

  return (
    <>
      <h1 className="flex justify-center">
        {requireSignup ? "Signup" : "Login"}
      </h1>
      <form className="shadow login-signup">
        {requireSignup && (
          <div>
            <label htmlFor="fullname">Fullname: </label>
            <input
              className="input"
              type="text"
              name="fullname"
              id="fullname"
              value={credantials.fullname}
              onChange={onChange}
            />
          </div>
        )}
        <div>
          <label htmlFor="username">Username: </label>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            value={credantials.username}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            value={credantials.password}
            onChange={onChange}
          />
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={onHandleSubmit}>
            {requireSignup ? "Signup" : "Login"}
          </button>
        </div>
        <p>
          {requireSignup ? "Dont" : "Already"} have a user?
          <a className="a-link" onClick={onChangeForm}>
            {requireSignup ? "Login" : "Signup"}
          </a>
        </p>
      </form>
    </>
  );
}
