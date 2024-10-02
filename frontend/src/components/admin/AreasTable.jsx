import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import {
  getAreas,
  createArea,
  updateArea,
  deleteArea,
} from '../../services/api'; 

const AreasTable = () => {
  const [areas, setAreas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAreaName, setNewAreaName] = useState('');
  const [selectedAreaId, setSelectedAreaId] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setNewAreaName('');
    setSelectedAreaId(null);
  };

  const handleShow = (areaId) => {
    setShowModal(true);
    setSelectedAreaId(areaId);
    const selectedArea = areas.find((area) => area.IdArea === areaId);
    setNewAreaName(selectedArea ? selectedArea.NombreA : '');
  };

  const handleSaveArea = async () => {
    if (selectedAreaId) {
      // Editar área existente
      await updateArea(selectedAreaId, { NombreA: newAreaName });
    } else {
      // Crear nueva área
      await createArea({ NombreA: newAreaName });
    }

    // Actualizar la lista de áreas después de la operación
    const updatedAreas = await getAreas();
    setAreas(updatedAreas.data);

    handleClose();
  };

  const handleDeleteArea = async (areaId) => {
    await deleteArea(areaId);
    const updatedAreas = await getAreas();
    setAreas(updatedAreas.data);
  };

  useEffect(() => {
    const fetchAreas = async () => {
      const areasData = await getAreas();
      setAreas(areasData.data);
    };

    fetchAreas();
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={() => handleShow(null)}>
        Crear Nueva Área
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre del Área</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => (
            <tr key={area.IdArea}>
              <td>{area.NombreA}</td>
              <td>
                <Button variant="info" onClick={() => handleShow(area.IdArea)}>
                  Editar
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteArea(area.IdArea)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedAreaId ? 'Editar Área' : 'Crear Nueva Área'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAreaName">
              <Form.Label>Nombre del Área</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del área"
                value={newAreaName}
                onChange={(e) => setNewAreaName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveArea}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AreasTable;
