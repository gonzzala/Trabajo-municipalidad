import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';

const handleLogout = () => {
  localStorage.token = '';
  localStorage.loggedIn = false;
};

function AdminAreaNavBar({ onSwitchToUsers, onSwitchToReports, onShowPlazoVencimientos, onSwitchToAdmins }) {
  return (
    <Navbar className='adminNav' bg="dark" expand="lg" style={{ backgroundColor: '#a7a7a7', paddingTop: 0, paddingBottom: 0, position: 'fixed', width: '100%' }}>
      <Navbar.Brand>
        <a href="/"> <Image src="\Logo-nav2.jpg" alt="Logo" width="100" height="100" style={{ marginLeft: '5px', height: '100%' }} /></a>
      </Navbar.Brand>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Nav.Link href="" onClick={onSwitchToUsers} className="text-white">USUARIOS</Nav.Link>
            <Nav.Link href="" onClick={onSwitchToReports} className="text-white">INFORMES</Nav.Link>
            <Nav.Link href="/" onClick={handleLogout} className="text-white">CERRAR SESIÓN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminAreaNavBar;
