import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../Context/UserProvider'
const NavBar = () => {
const { user, setUser } = useContext(UserContext)

// if (user === null){
//   setUser(false)
// }
  return (
    <header className="header">
        <div className="logo">DARREN'S AUTO DETAIL
            <img src="/images/Daco_721500.png" style={{marginLeft:"10px",display:"inline",height:"35px", width:"110px",filter:"invert(1)"}}/>
        </div>
    <nav className="navigation">
      <a href="/">HOME</a>
      <a href="/gallery">GALLERY</a>
      <a href="/market">MARKET</a>
      <a href="/services">SERVICES</a>
      <a href="/appointment">APPOINTMENT</a>
      <a href="/contact">CONTACT US</a>
      {user ? <a href="/account">ACCOUNT</a> : <a href="/login">LOGIN</a>}
    </nav>
  </header>
  )
}
export default NavBar