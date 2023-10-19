export default async function Gallery() {
  const image_srcs = [
    "/images/accord.jpg",
    "/images/accord1.jpg",
    "/images/accord2.jpg",
    "/images/accord3.jpg",
    "/images/subie.jpg",
    "/images/subie1.jpg",
    "/images/subie2.jpg",
    "/images/subie3.jpg",
    "/images/bmw.jpeg",
    "/images/bmw1.jpeg",
    "/images/bmw2.jpeg",
    "/images/bmw3.jpeg",
    "/images/bmw4.jpeg",
    "/images/bmw5.jpeg",
    "/images/bmw6.jpeg",
    "/images/bmw7.jpeg",
    "/images/bmw8.jpeg",
    "/images/bmw9.jpeg",
  ];
  const image_divs = image_srcs.map((image) => {
    return (
      <img
        key={image}
        className="image-div"
        alt="car review image"
        src={image}
      ></img>
    );
  });
  return (
    <div className="container">
      <h1 className="route-head">GALLERY</h1>
      <p className="subtext">IMAGES FROM SATISFIED CUSTOMERS</p>
      <div className="image-flex">{image_divs}</div>
    </div>
  );
}
