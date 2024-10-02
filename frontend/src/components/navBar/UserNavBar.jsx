import React from 'react'
import "./NavBar.css"
import Nav from 'react-bootstrap/Nav';

const handleLogout = () => {
  localStorage.token = '';
  localStorage.loggedIn = false;
};

const UserNavBar = () => {
  return (
    <div className='navContainer'>
      <a href=""><img className='navLogo' src="\Logo-nav.jpg" alt="logo-nav" /></a>
      <div className='navTitle'>
      <p>MUNICIPALIDAD DE AZUL</p>
      </div>
      <div className='logOut'>
      <Nav.Link href="/" onClick={handleLogout} className="text-white">CERRAR SESIÓN</Nav.Link>
      </div>
    </div>
  )
}

export default UserNavBar
