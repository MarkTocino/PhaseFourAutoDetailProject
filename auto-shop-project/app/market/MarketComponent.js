export default function MarketComponent(props) {
  return (
    <div className="flex-col w-full sm:flex items-center justify-center mb-5">
      <div className="service-image-div">
        <img className="market-image " src={props.image} />
      </div>
      <div>
        <ol className="text-xl sm:text-3xl">
          <li>
            {props.make} {props.model}
          </li>
          <li></li>
          <li>{props.year}</li>
          <li>{props.condition}</li>
          <li>{props.miles} miles</li>
          <li>Starting Bid: {props.price}</li>
        </ol>
      </div>
    </div>
  );
}
