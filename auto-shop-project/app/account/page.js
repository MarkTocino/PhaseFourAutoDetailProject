"use client";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserProvider";
import { useRouter } from "next/navigation";
export default function Test() {
  const [loading, setLoading] = useState(true);
  const [edting, setEditing] = useState(false);

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
          <h4 className="text-5xl sm:text-7xl py-9 px-4">My Profile</h4>
          <div className="flex justify-evenly max-w-[500px] m-auto text-xl mb-3">
            <button
              className="cursor-pointer bg-amber-400 text-black p-1 px-2 rounded-sm"
              onClick={() => setEditing((prevstate) => !prevstate)}
            >
              Edit Information
            </button>
            <a
              className="bg-red-400 text-black p-1 px-2 rounded-sm"
              onClick={handleClick}
              href="/login"
            >
              Logout
            </a>
          </div>
          <table className="m-auto w-4/5 sm:w-2/5 mb-4">
            <tbody className='px-3 text-xl'>
              <tr id="row-0" className="">
                <td className="py-2">Name: </td>
                <td>
                  {user.first_name ? user.first_name : "______"}{" "}
                  {user.last ? user.last : ""}
                </td>
              </tr>
              <tr id="row-1" className="">
                <td className="py-2">Email: </td>
                <td>
                  {user.email ? user.email : "Email"}
                </td>
              </tr>
              <tr id="row-2" className="">
                <td className="py-2">Phone #: </td>
                <td>
                  {user.phone_number ? user.phone_number : "#"}
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className="text-5xl sm:text-7xl py-9 px-4">My Appointments</h4>
          <div className="flex flex-wrap justify-evenly">
            {user.appointments ? (
              user.appointments.map((appt) => {
                return (
                  <div key={appt.id} className="appointment-div rounded-md ">
                    <span className="text-green-500 text-2xl">DATE:</span>{" "}
                    {appt.date}
                    <br />
                    <span className="text-green-500 text-2xl">TIME:</span>{" "}
                    {appt.time}
                    <br />
                    <span className="text-red-500">CAR:</span> {appt.car.make}{" "}
                    {appt.car.model} {appt.car.year}
                    <br />
                    <span className="text-red-500">LICENSE:</span>{" "}
                    {appt.car.plate_number}
                    <br />
                    <span className="text-red-500">SERVICE:</span>{" "}
                    {appt.type_of_service}
                    <br />
                    <span className="text-violet-500">Notes:</span>{" "}
                    {appt.notes ? appt.notes : "None"}
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
