"use client";
import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import { UserContext } from "../../Context/UserProvider";
import { useRouter } from "next/navigation";
export default function Test() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { user, setUser, BACKEND_URL } = useContext(UserContext);
  const router = useRouter();
  console.log(user)
  const handleClick = () => {
    fetch(`${BACKEND_URL}/logout`, {
      method: "DELETE",
      credentials: "include",
    }).then(setUser(null));
  };
  const onSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/current`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          first_name: firstName ? firstName : user.first_name,
          last_name: firstName ? lastName : user.last_name,
          email: formik.values.email ? formik.values.email : user.email,
          phone_number: formik.values.phoneNumber ? formik.values.phoneNumber : user.phone_number
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setEditing(false);
        formik.resetForm()
      } else {
        console.error("Failed to edit");
      }
    } catch (error) {
      console.error("There was an error editing:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit,
  });
  const names = formik.values.fullName.split(" ");
  const firstName = names[0];
  const lastName = names.length > 1 ? names.slice(1).join(" ") : "";
  return (
    <div className="container">
      {user ? (
        <div>
          <h4 className="text-5xl sm:text-7xl py-9 px-4">My Profile</h4>
          <div className="flex justify-evenly max-w-[500px] m-auto text-xl mb-3">
            {editing ? (
              <button
                className="cursor-pointer bg-amber-400 text-black p-1 px-2 rounded-sm"
                onClick={() => setEditing((prevstate) => !prevstate)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="cursor-pointer bg-amber-400 text-black p-1 px-2 rounded-sm"
                onClick={() => setEditing((prevstate) => !prevstate)}
              >
                Edit Information
              </button>
            )}
            <a
              className="bg-red-400 text-black p-1 px-2 rounded-sm"
              onClick={handleClick}
              href="/login"
            >
              Logout
            </a>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <table className="m-auto w-4/5 sm:w-2/5">
              <tbody className="px-3 text-xl">
                <tr id="row-0" className="">
                  <td className="py-2">Name: </td>
                  <td>
                    {user.first_name ? user.first_name : "Anonymous"}{" "}
                    {user.last_name ? user.last_name : ""}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    {editing ? (
                      <input
                        className="rounded-sm p-1 pl-3 text-black "
                        name="fullName"
                        type="text"
                        placeholder="First & Last Name"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr id="row-1" className="">
                  <td className="py-2">Email: </td>
                  <td>{user.email ? user.email : "No Email Set"}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    {editing ? (
                      <input
                        className="rounded-sm p-1 pl-2 text-black "
                        name="email"
                        type="email"
                        placeholder="Enter New Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                    ) : null}
                  </td>
                </tr>
                <tr id="row-2" className="">
                  <td className="py-2">Phone #: </td>
                  <td>
                    {user.phone_number ? user.phone_number : "###-###-####"}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    {editing ? (
                      <input
                        className="rounded-sm p-1 pl-3 text-black "
                        name="phoneNumber"
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="e.g 123-456-7890"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                      />
                    ) : null}
                  </td>
                </tr>
              </tbody>
            </table>
            {editing ? (
              <button
                className="mt-2 cursor-pointer bg-green-500 text-black px-2 rounded-sm"
                type="submit"
              >
                Save
              </button>
            ) : null}
          </form>

          <h4 className="text-5xl sm:text-7xl py-9 px-4">My Appointments</h4>
          <div className="flex flex-wrap justify-evenly mb-5">
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
