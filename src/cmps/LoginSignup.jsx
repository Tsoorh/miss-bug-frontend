import { useState } from "react";
import { authService } from "../services/auth/auth.service.js";


export function LoginSignup({ signup = true }) {
  const [isSignup, setIsSignup] = useState(signup);
  const [credantials, setCredendials] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  function onChange(ev) {
    const { name, value } = ev.target;

    setCredendials((prevCred) => ({
      ...prevCred,
      [name]: value,
    }));
  }

  async function onHandleSubmit() {
    try {
      if (isSignup) {
        const user = await authService.login(credantials.username,credantials.password)
        console.log("🚀 ~ onHandleSubmit ~ user:", user)
      } else {
        const user = await authService.signup(credantials)
        console.log("🚀 ~ onHandleSubmit ~ user:", user)
      }
    } catch (err) {
        console.log("🚀 ~ onHandleSubmit ~ err:", err)
    }
  }

  function onChangeForm(ev) {
    ev.preventDefault();
    setIsSignup((prev) => !prev);
  }

  return (
    <>
      <h1 className="flex justify-center">{isSignup ? "Signup" : "Login"}</h1>
      <form className="shadow login-signup">
        {isSignup && (
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
          <button onClick={onHandleSubmit}>
            {isSignup ? "Signup" : "Login"}
          </button>
        </div>
        <p>
          {isSignup ? "Dont" : "Already"} have a user?
          <a className="a-link" onClick={onChangeForm}>
            {isSignup ? "Login" : "Signup"}
          </a>
        </p>
      </form>
    </>
  );
}
