// En tu archivo components/admin/PlazoVencimientos.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updatePlazoVto } from '../../services/api'; // Ajusta la ruta según la ubicación real de tu servicio

const PlazoVencimientos = ({ show, onHide, plazo }) => {
  const [cantidadDias, setCantidadDias] = useState('');

  useEffect(() => {
    if (Array.isArray(plazo) && plazo.length > 0) {
      setCantidadDias(plazo[0]?.Dias || '');
    } else {
      setCantidadDias('');
    }
  }, [plazo]);

  const handleSave = async () => {
    try {
      // Actualizar el plazo utilizando el servicio
      await updatePlazoVto({ IdPlazo: plazo[0]?.IdPlazo, Dias: cantidadDias });
      
      onHide();
    } catch (error) {
      console.error('Error al actualizar el plazo:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Plazos de Vencimientos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Cantidad de Días</Form.Label>
          <Form.Control
            type="number"
            value={cantidadDias}
            onChange={(e) => setCantidadDias(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlazoVencimientos;
