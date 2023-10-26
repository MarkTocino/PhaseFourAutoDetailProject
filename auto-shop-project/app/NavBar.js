import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserProvider";
const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <header className="header">
        <div className="logo">
          AUTO DETAIL
          <img
            src="/images/logoCar.png"
            style={{
              marginLeft: "10px",
              display: "inline",
              height: "35px",
              width: "110px",
              filter: "invert(1)",
            }}
          />
        </div>
        <nav className="navigation">
          <img
            className="w-[40px] cursor-pointer z-[100000]"
            src="/svgs/gearShift.svg"
            alt="gearshift-dropdown"
            onClick={() => {
              console.log(menuOpen);
              setMenuOpen((prevstate) => !prevstate);
            }}
          />
          <a href="/" onClick={() => setMenuOpen(false)}>
            HOME
          </a>
          <a href="/gallery" onClick={() => setMenuOpen(false)}>
            GALLERY
          </a>
          <a href="/market" onClick={() => setMenuOpen(false)}>
            MARKET
          </a>
          <a href="/services" onClick={() => setMenuOpen(false)}>
            SERVICES
          </a>
          <a href="/appointment" onClick={() => setMenuOpen(false)}>
            APPOINTMENT
          </a>
          {user ? (
            <a href="/account" onClick={() => setMenuOpen(false)}>
              ACCOUNT
            </a>
          ) : (
            <a href="/login" onClick={() => setMenuOpen(false)}>
              ACCOUNT
            </a>
          )}
        </nav>
      </header>
      <div id="menu" className={menuOpen ? "slide-in" : "slide-out"}>
        <a href="/" onClick={() => setMenuOpen(false)}>
          <img className="w-[50px]" src="/svgs/home.svg" alt="home" />
        </a>
        <a href="/gallery" onClick={() => setMenuOpen(false)}>
          <img className="w-[50px]" src="/svgs/gallery.svg" alt="gallery" />
        </a>
        <a href="/market" onClick={() => setMenuOpen(false)}>
          <img className="w-[50px]" src="/svgs/market.svg" alt="market" />
        </a>
        <a href="/services" onClick={() => setMenuOpen(false)}>
          <img className="w-[50px]" src="/svgs/services.svg" alt="services" />
        </a>
        <a href="/appointment" onClick={() => setMenuOpen(false)}>
          <img
            className="w-[50px]"
            src="/svgs/appointment.svg"
            alt="appointment"
          />
        </a>
        <a
          href={user ? "/account" : "/login"}
          onClick={() => setMenuOpen(false)}
        >
          <img className="w-[50px]" src="/svgs/account.svg" alt="account" />
        </a>
      </div>
    </div>
  );
};
export default NavBar;
