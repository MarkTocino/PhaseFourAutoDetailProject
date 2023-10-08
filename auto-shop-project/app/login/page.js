"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState('');
  const router = useRouter();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (email.length === 0) {
      return "Email has been left blank";
    } else if (password.length === 0) {
      return "password has left blank";
    } else {
      const response = await fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      const data = await response.json()
        if (data.ok)
        return setUser(data)
      router.push('/dashboard')
    }
  }
return (
    <>
    <div className="acc-container">
      <img className="background-image" src="/images/carshop.jpg" 
      style={{opacity:"95%"}}/>
      <div className="centered-text"
      style={{top:"50%"}}>
        <form className="login-box" onSubmit={handleFormSubmit}>
          <h2>DARREN'S AUTO DETAIL</h2>
          <img
            src="/images/Daco_721500.png"
            style={{ marginTop: "15px", height: "70px", width: "220px" }}
          />
          <div
            className="login-wrap"
            style={{
              marginTop: "20px",
              borderTopLeftRadius: "7px",
              borderTopRightRadius: "7px",
              borderBottom: "none",
            }}
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
            style={{
              borderBottomLeftRadius: "7px",
              borderBottomRightRadius: "7px",
            }}
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
          <button href='/login' id="appt-button" type="submit">
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