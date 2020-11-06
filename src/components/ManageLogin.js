import React, { useState, useEffect } from "react";
import SignInForm from "./SignInForm";
import * as userApi from "../api/userApi";
import { useCookies } from "react-cookie";
const ManageLogin = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [cookies, setCookie] = useCookies(["user", "email"]);

  function handleChange({ target }) {
    setErrors({});
    setCredentials({
      ...credentials,
      [target.name]: target.value,
    });
  }

  if (cookies.role === "basic") {
    props.history.push("/staff");
  } else if (cookies.role === "admin") {
    props.history.push("/admin");
  }

  const handleGoogleResponse = (response) => {
    setCookie("role", "basic", { path: "/" });
    setCookie("email", response.profileObj.email, { path: "/" });
    props.history.push("/staff");
  };

  function handleSubmit(event) {
    event.preventDefault();
    userApi
      .loginUser(credentials)
      .then((user) => {
        if(user==null)
        {
          setErrors({...errors, ["message"]: "Invalid credentials"});
        }
        else
      {
        setCookie("role", user.role, { path: "/" });
        setCookie("email", user.email, { path: "/" });
        setCookie("role", user.role, { path: "/staff" });
        setCookie("email", user.email, { path: "/staff" });
        setCookie("role", user.role, { path: "/admin" });
        setCookie("email", user.email, { path: "/admin" });
        if (user.role == "basic") {
          props.history.push("/staff");
        } else props.history.push("/admin");
      }
      })
      .catch((e) => {});
  }
  return (
    <>
      <SignInForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClickGoogle={handleGoogleResponse}
        error={errors}
      />
    </>
  );
};

export default ManageLogin;
