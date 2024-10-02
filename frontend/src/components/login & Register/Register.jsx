import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getPartidos } from '../../services/api';
import MapPicker from '../LocationSearchInput'; 

const RegisterComponent = ({ show, handleClose, handleRegistroExitoso, handleRegistroError }) => {
  const [partidos, setPartidos] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    DNI: '',
    direccion: '',  // Cambiado a string vacío inicialmente
    mail: '',
    contraseña: '',
    idpartido: '',
    enable: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Agregado el check de null para asegurarse de que selectedLocation esté definido
    const locationString = selectedLocation ? `${selectedLocation.lat}, ${selectedLocation.lng}` : '';

    const updatedFormData = { ...formData, direccion: locationString };

    fetch('http://localhost:4000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos enviados:', data);
        if (data.message === 'Registro exitoso') {
          handleRegistroExitoso();
          handleClose();
        } else if (data.message === 'Error en el servidor') {
          handleRegistroError();
          handleClose();
        }
      })
      .catch((error) => {
        console.error('Error al registrar:', error);
        handleRegistroError();
      });
  };

  useEffect(() => {
    getPartidos()
      .then((response) => {
        setPartidos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener Partidos:', error);
      });
  }, []);

  return (
    <Modal show={show} onHide={handleClose} className="modal-container">
      <Modal.Header closeButton>
        <Modal.Title>Bienvenido !</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-content">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formBasicNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" required placeholder="Nombre" name="nombre" onChange={handleChange} />
            </Form.Group>

            <Form.Group as={Col} controlId="formBasicApelldio">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" required placeholder="Apellido" name="apellido" onChange={handleChange} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicDNI">
            <Form.Label>DNI</Form.Label>
            <Form.Control type="number" required placeholder="DNI" name="DNI" onChange={handleChange} />
          </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPartido">
              <Form.Label>Partido</Form.Label>
            <Form.Control
              name="idpartido"
              as="select"
              value={formData.idpartido}
              onChange={handleChange}>
              <option value="" disabled>Seleccione partido</option>
              {partidos.map((partido) => (
                <option key={partido.IdPartido} value={partido.IdPartido}>
                  {partido.NombreP}
                </option>
              ))}
            </Form.Control>
            </Form.Group>
           {/* <Form.Group className="mb-3" controlId="formBasicDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" required placeholder="Dirección" name="direccion" onChange={handleChange} />
              </Form.Group>*/}
            <Form.Group>
              <Form.Label>Dirección:</Form.Label>
              <MapPicker onLocationSelect={setSelectedLocation} /> 
            </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" required placeholder="Correo" name="mail" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" required placeholder="Contraseña" name="contraseña" onChange={handleChange} />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterComponent;






/* import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const RegisterComponent = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} className="modal-container">
    <Modal.Header closeButton>
        <Modal.Title>Bienvenido !</Modal.Title>
    </Modal.Header>
    <Modal.Body className="modal-content">
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicEmail">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Apellido" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>DNI</Form.Label>
                <Form.Control type="number" placeholder="DNI" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Partido</Form.Label>
                <Form.Control type="number" placeholder="Partido" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Dirección" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Correo" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </div>
        </Form>
    </Modal.Body>
</Modal>

    );
};

export default RegisterComponent; */

