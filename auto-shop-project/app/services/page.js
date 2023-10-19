export default function Services() {
  return (
    <div
    className='py-5 sm:py-0'
      style={{
        fontFamily: "'Oswald', sans-serif",
        overflowY: "scroll",
      }}
    >
      <div className="service-block">
        <div className="service-text">
          <h1 className="service-header">EXTERIOR SERVICES</h1>
          <ol style={{ fontSize: "24px", fontWeight: "600" }}>
            <li>• Glass Cleaning</li>
            <li>• Body Cleaning</li>
            <li>• Body Polishing</li>
            <li>• Tire & Rim Cleaning</li>
          </ol>

          <div className="service-body-text">
            <div className="border-b-2 border-red-700 h-[10px]"></div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div className="service-image-div">
          <img src="/images/exterior.jpg" className="service-image" />
        </div>
      </div>
      <div className="border-b-2 border-white h-[10px] w-[90%] m-auto"></div>
      <div className="border-b-2 border-white h-[10px] w-[90%] m-auto mb-4"></div>
      {/*  */}
      <div className="service-block">
        <div className="service-image-div">
          <img src="/images/interiorclean.jpeg" className="service-image" />
        </div>
        <div className="service-text">
          <h1 className="service-header">INTERIOR SERVICES</h1>
          <ol style={{ fontSize: "24px", fontWeight: "600" }}>
            <li>• Engine Bay Cleaning</li>
            <li>• Surface Polishing</li>
            <li>• Glass Cleaning</li>
            <li>• Carpet Cleaning</li>
            <li>• Waste Removal and Vaccuum</li>
          </ol>
          <div className="service-body-text">
          <div className="border-b-2 border-red-700 h-[10px]"></div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
      <div className="border-b-2 border-white h-[10px] w-[90%] m-auto"></div>
      <div className="border-b-2 border-white h-[10px] w-[90%] m-auto"></div>

      {/*  */}
      <div className="service-block">
        <div className="service-text">
          <h1 className="service-header">OIL CHANGE</h1>
          <div className="service-body-text">
            Regular oil changes are commonly recommended every 4000-6000 miles.
            (varies among cars)
          </div>
          <div className="service-body-text">
          <div className="border-b-2 border-red-700 h-[10px]"></div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div className="service-image-div">
          <img src="/images/oilchange.jpg" className="service-image" />
        </div>
      </div>
      <div className="border-b-2 border-white h-[10px] w-[90%] m-auto"></div>
      <div className="border-b-2 border-white h-[10px] w-[90%] m-auto"></div>

      {/*  */}
      <div className="service-block">
        <div className="service-image-div">
          <img src="/images/brakes.jpg" className="service-image" />
        </div>
        <div className="service-text">
          <h1 className="service-header">BRAKE REPLACEMENT</h1>
          <div className="service-body-text">
            Ensuring that your brakes are in top condition is not just essential
            for the longevity of your car, but also for the safety of you and
            your passengers.
            <div className="border-b-2 border-red-700 h-[10px]"></div>

            <h2>SIGNS YOU NEED NEW BRAKES/BRAKE PADS </h2>
            <ol>
              <li>• soft/spongy braking</li>
              <li>• squeaking/grinding noise</li>
              <li>• increased stopping distance</li>
            </ol>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}