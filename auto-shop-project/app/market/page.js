"use client";

import { useState } from "react";
import MarketComponent from "./MarketComponent";

export default function Market() {
  const [selectedImage, setSelectedImage] = useState(null);

  const image_srcs = [
    {
      image: "/images/accord.jpg",
      make: "Honda",
      model: "Accord",
      year: "2022",
      price: "$31,000",
      miles: "6,530",
      condition: "Modified, slightly used",
    },
    {
      image: "/images/subie.jpg",
      make: "Subaru",
      model: "Forester",
      year: "2022",
      price: "$29,000",
      miles: "8,325",
      condition: "Mint",
    },
    {
      image: "/images/carshop.jpg",
      make: "Honda",
      model: "S2000",
      year: "2009",
      price: "$19,000",
      miles: "105,024",
      condition: "Restored",
    },
    {
      image: "/images/bmw6.jpeg",
      make: "BMW",
      model: "M4 Competition",
      year: "2021",
      price: "$71,000",
      miles: "35,155",
      condition: "Used",
    },
  ];
  function handleClick(data) {
    setSelectedImage(data);
    //messing around with giving images a click function
  }
  const image_divs = image_srcs.map((image) => {
    return (
      <tr className="border-t-2 " id="row-0" key={image.image}>
        <td className="py-2">{image.make}</td>
        <td>{image.model}</td>
        <td>{image.year}</td>
        <td>{image.condition}</td>
        <td>{image.miles}</td>
        <td onClick={() => handleClick(image)}>
          <img className="w-[20px] m-auto" src="/svgs/eye.svg" alt="view-eye" />
        </td>
      </tr>
    );
  });
  return (
    <div className="container">
      <h1 className="route-head">MARKET</h1>
      <p className="subtext">
        QUALITY USED CARS <br /> CONTACT US AT SAMPLE@EMAIL.COM WITH ANY
        QUESTIONS OR OFFERS
      </p>
      <table className="m-auto w-4/5 border-2 border-white mb-4">
        <tbody>
          <tr id="row-0" className="text-xl">
            <td>Make</td>
            <td>Model</td>
            <td>Year</td>
            <td>Condition</td>
            <td>Odometer</td>
            <td className="text-blue">View</td>
          </tr>
          {image_divs}
        </tbody>
      </table>
      {selectedImage && <MarketComponent {...selectedImage} />}
    </div>
  );
}
