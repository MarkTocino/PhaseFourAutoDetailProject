"use client";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserProvider";
import { useRouter } from "next/navigation";
export default function Test () {
const [loading, setLoading] = useState(true);
const router = useRouter();
const { user } = useContext(UserContext)

  const handleClick = () => {
    fetch("http://127.0.0.1:5555/logout", {
      method: "DELETE",
      credentials: "include",
    }).then((data) => setUser(data));
  };
  return (
    <div className="container">
        <div style={{ width: "100%" }}>
          {user ? (
            <div>
              <h2 className='route-head'>{user.first_name}'s Appointments</h2>
              <div className="appointment-BoxContainer">
                {user.appointments ? (
                  user.appointments.map((appt) => {
                    return (
                      <div key={appt.id} className="appointment-div">
                        DATE: {appt.date}
                        <br />
                        TIME: {appt.time}
                        <br />
                        CAR : {appt.car.make} {appt.car.model} {appt.car.year}
                        <br />
                        LICENSE: {appt.car.plate_number}
                        <br />
                        Type of Service: {appt.type_of_service}
                        </div>
                    );
                  })
                ) : (
                  <div>There is no Appointment's </div>
                )}
                <a href="/accountsettings">Account Settings</a>
                <a onClick={handleClick} href="/login">
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <div>LOADING...</div>
          )}
        </div>
    </div>
  );
}
