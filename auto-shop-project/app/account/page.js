"use client";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserProvider";
import { useRouter } from "next/navigation";
export default function Test() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user, setUser, BACKEND_URL } = useContext(UserContext);

  const handleClick = () => {
    fetch(`${BACKEND_URL}/logout`, {
      method: "DELETE",
      credentials: "include",
    }).then((data) => setUser(data));
  };
  return (
    <div className="container">
      {user ? (
        <div>
          <h4 className="text-5xl sm:text-7xl py-9 px-4">My Appointments</h4>
          <div className='flex justify-evenly max-w-[500px] m-auto text-xl mb-3'>
            <a className='bg-amber-400 text-black p-1 px-2 rounded-sm' href="/accountsettings">Account Settings</a>
            <a className='bg-red-400 text-black p-1 px-2 rounded-sm'onClick={handleClick} href="/login">
              Logout
            </a>
          </div>
          <div className="flex flex-wrap justify-evenly">
            {user.appointments ? (
              user.appointments.map((appt) => {
                return (
                  <div key={appt.id} className="appointment-div">
                    <span className="text-red-500">DATE:</span> {appt.date}
                    <br />
                    <span className="text-red-500">TIME:</span> {appt.time}
                    <br />
                    <span className="text-red-500">CAR:</span> {appt.car.make}{" "}
                    {appt.car.model} {appt.car.year}
                    <br />
                    <span className="text-red-500">LICENSE:</span>{" "}
                    {appt.car.plate_number}
                    <br />
                    <span className="text-red-500">SERVICE:</span>{" "}
                    {appt.type_of_service}
                  </div>
                );
              })
            ) : (
              <div>No Appointments Scheduled</div>
            )}
          </div>
        </div>
      ) : (
        <div>LOADING...</div>
      )}
    </div>
  );
}
