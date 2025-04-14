import React, { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = userNameDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passValue
    ) {
      alert("Please provide all required information's");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passValue,
      });
      alert("registered successfully. Please login!");
      navigate("/login");
    } catch (error) {
      alert("something went wrong");
      console.log(error.response);
    }
  }

  return (
    <section className={classes.register_wrapper}>
      <form onSubmit={handleSubmit}>
        <div className={classes.name_wrapper}>
          <div className={classes.first_name}>
            <span>First name</span>
            <input ref={firstNameDom} type="text"/>
          </div>
          <div className={classes.second_name}>
            <span>Last name</span>
            <input ref={lastNameDom} type="text"/>
          </div>
        </div>
        <div className={classes.other}>
          <span>Username</span>
          <input ref={userNameDom} type="text"/>
        </div>
        <div className={classes.other}>
          <span>email</span>
          <input ref={emailDom} type="email" />
        </div>
        <div className={classes.other}>
          <span>Password</span>
          <input ref={passwordDom} type="password" />
        </div>
        <button type="submit">Register</button>
        <Link to={"/login"}>Login</Link>
      </form>
    </section>
  );
}

export default Register;
