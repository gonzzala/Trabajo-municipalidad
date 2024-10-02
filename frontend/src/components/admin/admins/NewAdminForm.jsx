import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const NewAdminForm = ({ areas, show, onHide, onCreateAdmin }) => {
  const [newAdmin, setNewAdmin] = useState({
    idadministrador: '',
    idarea: areas.IdArea,
    nivel: '1',
    nombre: '',
    mail: '',
    contraseña: ''
  });

  const [error, setError] = useState(null);

  const handleCreateAdmin = async () => {
    try {
      const token = localStorage.token;
      const response = await fetch('http://localhost:4000/api/admin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token, // Agrega el token al encabezado
        },
        body: JSON.stringify(newAdmin),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Datos enviados:', data);
        if (data.message === 'Administrador creado exitosamente') {
          onCreateAdmin(data.admin);
          onHide();
        }
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error al crear administrador:', error);
      setError('Error al crear administrador. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={() => { onHide(); setError(null); }}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Administrador</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group>
          <Form.Label>Acceso</Form.Label>
          <Form.Control
            as="select"
            value={newAdmin.nivel}
            onChange={(e) => setNewAdmin({ ...newAdmin, nivel: e.target.value })}
          >
            <option value="1">Administrador General</option>
            <option value="2">Administrador De Área</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Área</Form.Label>
          <Form.Control
            as="select"
            value={newAdmin.idarea}
            onChange={(e) => setNewAdmin({ ...newAdmin, idarea: e.target.value })}
          >
            {areas.map((area) => (
              <option key={area.IdArea} value={area.IdArea}>
                {area.NombreA}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Mail</Form.Label>
          <Form.Control
            type="email"
            value={newAdmin.mail}
            onChange={(e) => setNewAdmin({ ...newAdmin, mail: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={newAdmin.nombre}
            onChange={(e) => setNewAdmin({ ...newAdmin, nombre: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={newAdmin.contraseña}
            onChange={(e) => setNewAdmin({ ...newAdmin, contraseña: e.target.value })}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { onHide(); setError(null); }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleCreateAdmin}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAdminForm;
