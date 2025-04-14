import React, { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css"


function Login() {
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      alert("Please provide all required information's");
      return;
    }
    try {
      const {data} = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert(data?.msg);

      localStorage.setItem('token', data.token)


      navigate("/");
      console.log(data)
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error?.response?.data?.msg)
    }
  }

  return (
    <section className={classes.login_wrapper}>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Email:</span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>Password:</span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
      <Link to={'/register'}>Register</Link>
      </form>
    </section>
  );
}

export default Login;
