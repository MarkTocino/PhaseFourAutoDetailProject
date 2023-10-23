"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../../Context/UserProvider";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noSuchUser, setNoSuchUser] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const { user, setUser, BACKEND_URL } = useContext(UserContext);
  const router = useRouter();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("submi");
    setNoSuchUser(false);
    setWrongPass(false);
    if (email.length === 0) {
      return "Email has been left blank";
    } else if (password.length === 0) {
      return "password has left blank";
    } else {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // console.log(data)
        window.location.href = "/account";
      } else if (response.status == 404) {
        setNoSuchUser(true);
      } else if (response.status == 400) {
        setWrongPass(true);
      }
    }
  };
  return (
    <>
      <div className="acc-container">
        <img
          className="background-image"
          src="/images/carshop.jpg"
          style={{ opacity: "95%" }}
        />
        <div className="centered-text" style={{ top: "50%" }}>
          <form className="login-box" onSubmit={handleFormSubmit}>
            <h2>Account Login</h2>
            <img
              src="/images/logoCar.png"
              style={{ marginTop: "15px", height: "70px", width: "220px" }}
              alt="Logo"
            />{" "}
            <div
              className="login-wrap"
              style={
                noSuchUser
                  ? {
                      marginTop: "20px",
                      borderTopLeftRadius: "7px",
                      borderTopRightRadius: "7px",
                      borderBottom: "",
                      borderColor: "red",
                    }
                  : {
                      marginTop: "20px",
                      borderTopLeftRadius: "7px",
                      borderTopRightRadius: "7px",
                      borderBottom: "none",
                    }
              }
            >
              <img
                style={{
                  height: "18px",
                  width: "25px",
                  filter: "invert(1)",
                  marginTop: "13px",
                  marginLeft: "12px",
                }}
                src="/images/email.png"
              />
              <input
                className="login-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
            </div>
            <div
              className="login-wrap"
              style={
                wrongPass
                  ? {
                      borderBottomLeftRadius: "7px",
                      borderBottomRightRadius: "7px",
                      borderColor: "red",
                    }
                  : {
                      borderBottomLeftRadius: "7px",
                      borderBottomRightRadius: "7px",
                    }
              }
            >
              <img
                style={{
                  height: "20px",
                  width: "20px",
                  filter: "invert(1)",
                  marginTop: "10px",
                  marginLeft: "15px",
                }}
                src="/images/password.png"
              />
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                style={{ paddingLeft: "14px" }}
              />
            </div>
            {noSuchUser ? (
              <h1 className="text-red-700">Incorrect email</h1>
            ) : null}
            {wrongPass ? (
              <h1 className="text-red-700">Incorrect password</h1>
            ) : null}
            <button href="/login" id="appt-button" type="submit">
              LOG IN
            </button>
            <div>
              <a className="links" href="/signup">
                Sign up
              </a>{" "}
              if no account
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
