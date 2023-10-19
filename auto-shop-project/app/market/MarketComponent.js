import { useFormik } from "formik";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserProvider";
import { useRouter } from "next/navigation";
export default function MarketComponent(props) {
  const { selectedCar, BACKEND_URL, user, offers, marketCars } =
    useContext(UserContext);
  const router = useRouter();
  const allOffers = offers
    ? offers
        .filter((offer) => offer.marketcar_id == selectedCar.id)
        .map((offer) => offer.offer)
    : null;
  const highestBid = allOffers ? Math.max(...allOffers) : null;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/offers`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: user ? user.email : formik.values.email,
          phone_number: user ? user.phone_number : formik.values.phone,
          code: selectedCar.code,
          offer: formik.values.offer,
        }),
      });

      if (response.ok) {
        await response.json();
        alert("Offer submitted. Reload the page to see the new highest offer.");
        router.refresh();
        formik.resetForm()
      } else {
        console.error("Failed to make the appointment");
      }
    } catch (error) {
      console.error("error submitting offer:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      offer: "",
      email: "",
      phone: "",
    },
    onSubmit,
  });

  return (
    <div className="flex-col mb-8">
      <div className="flex flex-wrap w-full m-auto sm:w-3/4 items-center justify-center my-8">
        <div className="service-image-div">
          <img className="market-image " src={props.image} />
        </div>
        <div className="sm:w-1/2">
          <ol className="text-xl sm:text-3xl">
            <li>
              Starting Bid:{" "}
              <span className="text-green-500">${props.price}</span>
            </li>
            <li>Condition: {props.condition}</li>
            <li>{props.miles} miles</li>
            <li>
              <span className="text-amber-500">
                Highest offer:{" "}
                <span className="text-green-500">${highestBid}</span>
              </span>
            </li>
          </ol>
        </div>
      </div>
      <div className="">
        <h3 className="text-xl sm:text-2xl border-2 m-auto p-1 px-10 inline-block">
          {props.make} {props.model} {props.year}
        </h3>
        <form className="text-xl p-3" onSubmit={onSubmit}>
          <table className="m-auto">
            <tbody>
              <tr>
                <td>Offer (USD):</td>
                <td>
                  <div className="market-wrap">
                    <h1>$</h1>
                    <input
                      className="market-input"
                      placeholder="Enter your offer here"
                      name="offer"
                      type="number"
                      value={formik.values.offer}
                      onChange={formik.handleChange}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  <div className="market-wrap">
                    <input
                      className="market-input"
                      placeholder="e.g. sample@gmail.com"
                      name="email"
                      type="email"
                      value={user ? user.email : formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Phone #:</td>
                <td>
                  <div className="market-wrap">
                    <input
                      className="market-input"
                      placeholder="e.g. 123-456-7890"
                      name="phone"
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      value={user ? user.phone_number : formik.values.phone}
                      onChange={formik.handleChange}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button id="appt-button" type="submit">
            SUBMIT OFFER
          </button>
        </form>
      </div>
    </div>
  );
}
