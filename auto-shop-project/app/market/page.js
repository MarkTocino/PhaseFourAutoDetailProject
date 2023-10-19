"use client";

import React, { useState, useContext } from "react";
import MarketComponent from "./MarketComponent";
import { UserContext } from "../../Context/UserProvider";


export default function Market() {
  const {setSelectedCar, selectedCar, BACKEND_URL, offers, marketCars} = useContext(UserContext);
  const backup_Cars = [
    {
      image: "/images/accord.jpg",
      make: "Honda",
      model: "Accord",
      year: "2022",
      price: "$31,000",
      miles: "6,530",
      condition: "Modified, slightly used",
      code: "G3M1KF",
    },
    {
      image: "/images/subie.jpg",
      make: "Subaru",
      model: "Forester",
      year: "2022",
      price: "$29,000",
      miles: "8,325",
      condition: "Mint",
      code: "8W5C7D",
    },
    {
      image: "/images/carshop.jpg",
      make: "Honda",
      model: "S2000",
      year: "2009",
      price: "$19,000",
      miles: "105,024",
      condition: "Restored",
      code: "B4H8ZP",
    },
    {
      image: "/images/m4comp.jpeg",
      make: "BMW",
      model: "M4 Competition",
      year: "2021",
      price: "$71,000",
      miles: "35,155",
      condition: "Used",
      code: "L5U3FG",
    },
  ];
  
  const market_Cars = marketCars? marketCars : backup_Cars;
  
  function handleClick(data) {
    setSelectedCar(data);
    
  }
  const image_divs = market_Cars.map((image) => {
    return (
      <tr className="border-t-2 " id="row-0" key={image.image}>
        <td className="py-2">{image.make}</td>
        <td>{image.model}</td>
        <td>{image.year}</td>
        <td>{image.miles}</td>
        <td className='view-eye' onClick={() => handleClick(image)}>
          <img className=" w-[20px] m-auto" src="/svgs/eye.svg" alt="view-eye" />
        </td>
      </tr>
    );
  });
  return (
    <div className="container">
      <h1 className="route-head">MARKET</h1>
      <p className="subtext w-4/5 m-auto">
        QUALITY USED CARS <br /> VIEW A CAR TO MAKE AN OFFER
      </p>
      <table className="m-auto w-4/5 border-2 border-white mb-4">
        <tbody>
          <tr id="row-0" className="text-xl">
            <td>Make</td>
            <td>Model</td>
            <td>Year</td>
            <td>Condition</td>
            <td className="text-blue">View</td>
          </tr>
          {image_divs}
        </tbody>
      </table>
      {selectedCar && <MarketComponent {...selectedCar} />}
    </div>
  );
}
