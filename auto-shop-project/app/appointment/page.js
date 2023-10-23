"use client";
import { useFormik } from "formik";
import { Router } from "next/dist/client/router";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserProvider";

export default function Appointment() {
  const { user, setUser, BACKEND_URL, appts } = useContext(UserContext);
  let today = new Date();
  today.setDate(today.getDate() + 1);
  let timeAhead = new Date(today);
  timeAhead.setMonth(today.getMonth() + 2);
  today = today.toISOString().slice(0, 10);
  timeAhead = timeAhead.toISOString().slice(0, 10);

  const onSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/MakeAppointment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          first_name: user ? user.first_name : formik.values.firstName,
          last_name: user ? user.last_name : formik.values.lastName,
          email: user ? user.email : formik.values.email,
          phone_number: user ? user.phone_number : formik.values.phoneNumber,
          password: formik.values.password,
          make: formik.values.make,
          model: formik.values.model,
          year: formik.values.year,
          engine: formik.values.engine,
          plate_number: formik.values.plateNumber,
          date: formik.values.date,
          time: formik.values.time,
          type_of_service: formik.values.service.join(", "),
          notes: formik.values.notes,
        }),
      });

      if (response.ok) {
        await response.json();
        alert("Appointment Made!");
      } else {
        console.error("Failed to make the appointment");
      }
    } catch (error) {
      console.error("There was an error making the appointment:", error);
    }
  };

  let takenTimes = [];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      make: "",
      model: "",
      year: "",
      engine: "",
      plateNumber: "",
      date: today,
      time: "07:00 AM",
      service: "",
      notes: "",
    },
    onSubmit,
  });

  if (appts)
    appts
      .filter((appt) => appt.date === formik.values.date)
      .forEach((appt) => takenTimes.push(appt.time));
  // console.log(takenTimes);
  const times = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  return (
    <div
      id="big"
      style={{
        minHeight: "100vw",
        paddingBottom: "60px",
        fontFamily: "'Oswald', sans-serif",
        backgroundImage: 'url("/images/tires.jpg")',
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <h1 className="route-head">SCHEDULE AN APPOINTMENT</h1>
      <form className="form-box" onSubmit={formik.handleSubmit}>
        <h1 className="contact-subheader">CONTACT INFORMATION</h1>
        <div className="submit-container">
          <div className="submit-box">
            First Name
            <input
              required
              className="input-box"
              name="firstName"
              type="text"
              placeholder="e.g. Elvis"
              onChange={formik.handleChange}
              value={user ? user.first_name : formik.values.firstName}
            />
          </div>
          <div className="submit-box">
            Last Name
            <input
              className="input-box"
              name="lastName"
              type="text"
              placeholder="e.g. Presley"
              onChange={formik.handleChange}
              value={user ? user.last_name : formik.values.lastName}
            />
          </div>
          <div className="submit-box">
            Email
            <input
              required
              className="input-box"
              name="email"
              type="text"
              placeholder="e.g. elvispresley88@gmail.com"
              onChange={formik.handleChange}
              value={user ? user.email : formik.values.email}
            />
          </div>
          <div className="submit-box">
            Phone Number
            <input
              required
              className="input-box"
              name="phoneNumber"
              type="text"
              placeholder="(optional) e.g. 123-456-7890"
              onChange={formik.handleChange}
              value={user ? user.phone_number : formik.values.phoneNumber}
            />
          </div>
        </div>
        <h1 className="contact-subheader">VEHICLE INFORMATION</h1>
        <div className="submit-container">
          <div className="submit-box">
            Make
            <input
              className="input-box"
              name="make"
              value={formik.values.make}
              onChange={formik.handleChange}
              type="text"
              placeholder="e.g. Honda"
            />
          </div>
          <div className="submit-box">
            Model
            <input
              className="input-box"
              name="model"
              value={formik.values.model}
              onChange={formik.handleChange}
              type="text"
              placeholder="e.g. Accord"
            />
          </div>
          <div className="submit-box">
            Year
            <input
              name="year"
              className="input-box"
              type="text"
              placeholder="e.g. 2022"
              value={formik.values.year}
              onChange={formik.handleChange}
            />
          </div>
          <div className="submit-box">
            Engine
            <input
              name="engine"
              className="input-box"
              type="text"
              placeholder="(optional) e.g. flat-four boxer"
              value={formik.values.engine}
              onChange={formik.handleChange}
            />
          </div>
          <div className="submit-box">
            License Plate/VIN
            <input
              required
              name="plateNumber"
              className="input-box"
              type="text"
              placeholder="e.g. ABC1234"
              value={formik.values.plateNumber}
              onChange={formik.handleChange}
            />
          </div>
          <div className="submit-box">
            Date
            <input
              required
              name="date"
              className="input-box"
              onChange={formik.handleChange}
              value={formik.values.date}
              type="date"
              min={today}
              max={timeAhead}
            />
          </div>
          <div className="submit-box">
            <label htmlFor="time">Select a time:</label>
            <select
              required
              id="time"
              name="time"
              onChange={formik.handleChange}
              value={formik.values.time}
            >
              {times.map((time) => {
                return (
                  <option
                    key={time}
                    onChange={formik.handleChange}
                    value={time}
                    disabled={takenTimes.includes(time)}
                    style={
                      takenTimes.includes(time)
                        ? { textDecoration: "line-through", color: "red" }
                        : {}
                    }
                  >
                    {time}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <h1 className="contact-subheader">TYPE OF SERVICE</h1>
        <div className="submit-container">
          <div className="submit-box" style={{ display: "flex" }}>
            <ul style={{ fontSize: "22px", width: "60%" }}>
              <li>
                <input
                  type="checkbox"
                  id="option1"
                  name="service"
                  value="Oil Change"
                  checked={formik.values.service.includes("Oil Change")}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option1">
                  Oil Change
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="option2"
                  name="service"
                  value="Brake/Brake Pad Replacement"
                  checked={formik.values.service.includes(
                    "Brake/Brake Pad Replacement"
                  )}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option2">
                  Brake/Brake Pad Replacement
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="option3"
                  name="service"
                  value="Tire & Rim Cleaning"
                  checked={formik.values.service.includes(
                    "Tire & Rim Cleaning"
                  )}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option3">
                  Tire & Rim Cleaning
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="option4"
                  name="service"
                  value="Body Polishing"
                  checked={formik.values.service.includes("Body Polishing")}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option4">
                  Body Polishing
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="option5"
                  name="service"
                  value="Exterior Hand Wash"
                  checked={formik.values.service.includes("Exterior Hand Wash")}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option5">
                  Exterior Hand Wash
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="option6"
                  name="service"
                  value="Engine Bay Cleaning"
                  checked={formik.values.service.includes(
                    "Engine Bay Cleaning"
                  )}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option6">
                  Engine Bay Cleaning
                </label>
              </li>
            </ul>
            <ul style={{ fontSize: "22px", width: "60%" }}>
              <li>
                <input
                  type="checkbox"
                  id="option7"
                  name="service"
                  value="Interior Surface Polishing"
                  checked={formik.values.service.includes(
                    "Interior Surface Polishing"
                  )}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option7">
                  Interior Surface Polishing
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="option8"
                  name="service"
                  value="Glass Cleaning"
                  checked={formik.values.service.includes("Glass Cleaning")}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option8">
                  Glass Cleaning
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="option9"
                  name="service"
                  value="Carpet Cleaning"
                  checked={formik.values.service.includes("Carpet Cleaning")}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option9">
                  Carpet Cleaning
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="option10"
                  name="service"
                  value="Waste Removal & Vacuuming"
                  checked={formik.values.service.includes(
                    "Waste Removal & Vacuuming"
                  )}
                  onChange={formik.handleChange}
                />
                <label className="service-li" htmlFor="option10">
                  Waste Removal & Vacuuming
                </label>
              </li>
            </ul>
          </div>
        </div>
        <h1 className="contact-subheader">Notes</h1>
        <div className="submit-container">
          <div className="submit-box">
            <textarea
              name="notes"
              id="message-box"
              type="text"
              value={formik.values.notes}
              onChange={formik.handleChange}
              placeholder="Let us know if you have any questions or concerns!"
            />
          </div>
        </div>
          <button id="appt-button" type="submit">
            MAKE APPOINTMENT
          </button>
      </form>
    </div>
  );
}
