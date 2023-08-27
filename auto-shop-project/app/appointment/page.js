"use client";

import { useState } from "react";

export default function Appointment() {
  let today = new Date();
  let timeAhead = new Date(today);
  timeAhead.setMonth(today.getMonth() + 2);
  // whatever value is added here is how many months ahead the appt can go
  today = today.toISOString().slice(0, 10);
  timeAhead = timeAhead.toISOString().slice(0, 10);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState(null);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('08:00')
  function handleSubmit(e) {
    e.preventDefault();
    pass;
  }
  // const newBeer = {
  //   name: newUser.value,
  //   tagline: newTitle.value,
  //   description: newDescription.value,
  //   image_url: newImage.value,
  //   likes: 0,
  //   time: newPostTime,
  //   saved: false,
  // };

  // postBeer(newBeer);
  // allBeers.push(newBeer);

  // fetch(`http://localhost:5555/appointments/`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: JSON.stringify(newBeer),
  // });
  // style={{ backgroundImage: 'url(/images/accord1.jpg)', backgroundPosition: 'center', height:'70vw'}}
  return (
    <div >
      <h1 className="route-head" style={{}}>
        SCHEDULE AN APPOINTMENT
      </h1>
      <form id="form-box" onSubmit={handleSubmit}>
        <h1 className="contact-subheader">CONTACT INFORMATION</h1>
        <div className="submit-container">
          <div className="submit-box">
            First Name
            <input
              className="input-box"
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="e.g. Elvis"
            />
          </div>
          <div className="submit-box">
            Last Name
            <input
              className="input-box"
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="e.g. Presley"
            />
          </div>
          <div className="submit-box">
            Email
            <input
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="e.g. elvispresley88@gmail.com"
            />
          </div>
          <div className="submit-box">
            Phone Number
            <input
              className="input-box"
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="e.g. 123-456-7890"
            />
          </div>
        </div>
        <h1 className="contact-subheader">VEHICLE INFORMATION</h1>
        <div className="submit-container">
          <div className="submit-box">
            Make
            <input
              className="input-box"
              onChange={(e) => setMake(e.target.value)}
              type="text"
              placeholder="e.g. Honda"
            />
          </div>
          <div className="submit-box">
            Model
            <input
              className="input-box"
              onChange={(e) => setModel(e.target.value)}
              type="text"
              placeholder="e.g. Accord"
            />
          </div>
          <div className="submit-box">
            Year
            <input
              className="input-box"
              onChange={(e) => setYear(e.target.value)}
              type="text"
              placeholder="e.g. 2022"
            />
          </div>
          <div className="submit-box">
            Engine (optional)
            <input
              className="input-box"
              onChange={(e) => setEngine(e.target.value)}
              type="text"
              placeholder="e.g. 252HP Turbo V4"
            />
          </div>
          <div className="submit-box">
            Date
            <input
              className="input-box"
              onChange={(e) => setDate(e.target.value)}
              type="date"
              value={date}
              min={today}
              max={timeAhead}
            />
          </div>
          <div className="submit-box">
            <label htmlFor='time'>Select a time:</label>
            <select id="time" name="time" value={time} onChange={(e)=>setTime(e.target.value)}>
              <option value="08:00">08:00 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">01:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
