"use client";
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { UserContext } from "../../Context/UserProvider";
import * as yup from "yup";

export const signup = () => {
  const { user, setUser, BACKEND_URL } = useContext(UserContext);
  const router = useRouter();

  const onSubmit = () => {
    fetch(`${BACKEND_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        first_name: formik.values.firstName,
        last_name: formik.values.lastName,
        email: formik.values.email,
        password: formik.values.password,
        phone_number: formik.values.phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
        router.push("/login");
      });
  };
  const basicSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("Please provide the first name")
      .min(3, "3 characters minimum"),
    lastName: yup
      .string()
      .required("Please provide the last name")
      .min(3, "3 characters minimum"),
    email: yup
      .string()
      .required("Please provide the email")
      .min(3, "3 characters minimum"),
    password: yup
      .string()
      .required("Please provide the password")
      .min(3, "3 characters minimum"),
    phoneNumber: yup
      .string()
      .required("Please Provide Phone Number")
      .min(10, "Must be 10 digits")
      .max(10, "This is over 10 digits"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  return (
    <div>
      <div className="acc-container">
        <img
          className="background-image"
          src="/images/carshop.jpg"
          style={{ opacity: "95%" }}
          alt="Background"
        />
        <div className="centered-text" style={{ top: "50%" }}>
          <form className="login-box" onSubmit={formik.handleSubmit}>
            <h2>DARREN'S AUTO DETAIL</h2>
            <img
              src="/images/Daco_721500.png"
              style={{ marginTop: "15px", height: "70px", width: "220px" }}
              alt="Logo"
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
                id="firstName"
                type="text"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </div>
            {<p>{formik.errors.firstName}</p>}
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
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
            {<p>{formik.errors.lastName}</p>}
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
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            {<p>{formik.errors.email}</p>}
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
                id="password"
                type="password"
                placeholder="Enter Your Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            {<p>{formik.errors.password}</p>}
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
                id="phoneNumber"
                type="PhoneNumber"
                placeholder="Enter Your Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </div>
            <p>{formik.errors.phoneNumber}</p>
            <button id="appt-button" type="submit">
              Sign Up
            </button>
            <div>
              Already registered?{" "}
              <a className="links" href="/login">
                Log in
              </a>{" "}
            </div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
};
export default signup;
