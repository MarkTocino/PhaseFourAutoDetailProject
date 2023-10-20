"use client";
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { UserContext } from "../../Context/UserProvider";
import * as yup from "yup";

export const signup = () => {
  const { user, setUser, BACKEND_URL } = useContext(UserContext);
  const router = useRouter();
  const onSubmit = async (e) => {
    console.log("register");
    if (formik.values.email.length === 0) {
      return "Email has been left blank";
    } else if (formik.values.password.length === 0) {
      return "Password has left blank";
    } else {
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
        }),
      });
      const data = await response.json();
      console.log(data)
      if (data.ok) setUser(data);
      window.location.href = "/account";
    }
  };
  const basicSchema = yup.object().shape({
    // firstName: yup
    //   .string()
    //   .required("Please provide the first name")
    //   .min(3, "3 characters minimum"),
    // lastName: yup
    //   .string()
    //   .required("Please provide the last name")
    //   .min(3, "3 characters minimum"),
    //   phoneNumber: yup
    //     .string()
    //     .required("Please Provide Phone Number")
    //     .min(10, "Must be 10 digits")
    //     .max(10, "This is over 10 digits"),
    email: yup
      .string()
      .required("Please provide the email")
      .min(3, "3 characters minimum"),
    password: yup
      .string()
      .required("Please provide the password")
      .min(3, "3 characters minimum"),
    confirm: yup
      .string()
      .required("Password must match")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      // firstName: "",
      email: "",
      password: "",
      confirm: "",
      // phoneNumber: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  console.log(formik.values)

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
            <h2>Create an Account</h2>
            <img
              src="/images/logoCar.png"
              className='my-3 h-[70px] w-[220px]'
              alt="Logo"
            />
            {/* <div
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
            <p>{formik.errors.phoneNumber}</p> */}
            <input
              name="email"
              label={
                formik.touched.email && formik.errors.email
                  ? "Email (johndoe@domain.xyz)"
                  : "Email"
              }
              placeholder="Enter your email"
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={
                formik.touched.email && formik.errors.email
                  ? "login-input border-2 border-rose-600"
                  : "login-input"
              }
            />
            <input
              name="password"
              label={
                formik.touched.password && formik.errors.password
                  ? "Password (at least 6 characters)"
                  : "Password"
              }
              placeholder="Enter your password"
              type="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={
                formik.touched.password && formik.errors.password
                  ? "login-input border-2 border-rose-600"
                  : "login-input"
              }
            />
            <input
              name="confirm"
              label={
                formik.touched.confirm && formik.errors.confirm
                  ? "Passwords must match"
                  : "Confirm password"
              }
              placeholder="Confirm your password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm}
              className={
                formik.touched.confirm && formik.errors.confirm
                  ? "login-input border-2 border-rose-600"
                  : "login-input"
              }
            />
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
