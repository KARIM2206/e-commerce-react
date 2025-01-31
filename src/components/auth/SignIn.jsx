import React, { useContext, useState } from "react";
import style from "../style.module.css";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function SignIn() {
  const { user, login } = useContext(AuthContext); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Navigate to="/" />; 

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className={style.containerForm}>
      <form className={style.form} onSubmit={handleSubmit}> 
        <div className={style.inputWrapper}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            required
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={style.inputWrapper}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button> 
      </form>
    </div>
  );
}

export default SignIn;
