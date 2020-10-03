import React, { useState, useEffect } from "react";
import SignInForm from "./SignInForm";
import * as userApi from "../api/userApi";
import { useCookies } from "react-cookie";
const ManageLogin = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(["user", "email"]);

  function handleChange({ target }) {
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
    console.log("bhjbiuboin" + JSON.stringify(response.profileObj));
    setCookie("role", "basic", { path: "/" });
    setCookie("email", response.profileObj.email, { path: "/" });
    props.history.push("/staff");
  };

  function handleSubmit(event) {
    event.preventDefault();
    userApi
      .loginUser(credentials)
      .then((user) => {
        setCookie("role", user.role, { path: "/" });
        setCookie("email", user.email, { path: "/" });
        if (user.role == "basic") {
          props.history.push("/staff");
        } else props.history.push("/admin");
      })
      .catch((e) => {});
  }
  return (
    <>
      <SignInForm
        credentials={credentials}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClickGoogle={handleGoogleResponse}
      />
    </>
  );
};

export default ManageLogin;
