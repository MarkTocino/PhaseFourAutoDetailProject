'use client'
import { useEffect, useState } from "react";

export default function Hello() {
  const [users, setUsers] = useState('');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));

    fetch("http://127.0.0.1:5555/cars")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cars");
        return res.json();
      })
      .then((data) => setCars(data))
      .catch((err) => console.error(err));
    },[])
  //   fetch("http://127.0.0.1:5555/users/current", {
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setUser(data))
  //     .catch((error) => console.error("Error fetching user data:", error));
  // }, []);

  // const userList = users.map((user) => (
  //   <div key={user.id}>
  //     {user.first_name} {user.last_name}
  //   </div>
  // ));

  const carList = cars.map((car) => (
    <div key={car.id}>
      {car.make} {car.model}
    </div>
  ));

  return (
    <div className="container">
      <section className="main-content">
        <img
          src="/images/car.jpg"
          alt="Descriptive text"
          className="background-image"
        />
        <div className="centered-text text-2xl sm:text-3xl">
          <span className="text-4xl sm:text-5xl">PREMIUM AUTO DETAILING SERVICE</span>
          <div className=" border-b-2 border-white h-[5px] my-2"></div>
          RELIABLE & AFFORDABLE
        </div>
      </section>
    </div>
  );
}
