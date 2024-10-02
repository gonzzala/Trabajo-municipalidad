import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { createReport, getAreas } from '../../services/api';
import MapPicker from '../LocationSearchInput'; 

const ReportModal = (props) => {
  const { idAdmin } = props;
  const [show, setShow] = useState(false);
  const [area, setArea] = useState('');
  const [situation, setSituation] = useState('');
  const [areas, setAreas] = useState([]);
  const [comentario, setComentario] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const userId = localStorage.getItem('userId');
  const [idCiudadano, setIdCiudadano] = useState('');

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newIdCiudadano;

    if (idAdmin) {
      newIdCiudadano = idAdmin;
    } else {
      newIdCiudadano = userId;
    }

    setIdCiudadano(newIdCiudadano);
  };

  useEffect(() => {
    // Esta parte maneja la lógica de envío del reporte
    if (idCiudadano !== '') {
      handleReportSubmission();
    }
  }, [idCiudadano]);

  const handleReportSubmission = () => {
    const newReport = {
      TipoDeSituacion: situation,
      Ubicacion: selectedLocation ? `${selectedLocation.lat}, ${selectedLocation.lng}` : '',
      Comentario: comentario,
      IdCiudadano: idCiudadano,
      IdArea: area,
      IdEstado: "1",
    };

    createReport(newReport, (error, response) => {
      if (error) {
        console.error('Error al crear el reporte:', error);
      } else {
        console.log('Reporte creado exitosamente', response);
        handleClose();
      }
    });
  };

  useEffect(() => {
    getAreas()
      .then((response) => {
        setAreas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener áreas:', error);
      });
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Crear Reporte
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear un nuevo reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Área del Reporte:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                >
                  <option value="" disabled>Seleccione área</option>
                  {areas.map((area) => (
                    <option key={area.IdArea} value={area.IdArea}>
                      {area.NombreA}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Tipo de Situación:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  required
                >
                  <option value="" disabled>Selecciona un tipo de situación</option>
                  <option value="Agradecimiento">Agradecimiento</option>
                  <option value="OtraSituacion">Otra Situación</option>
                  <option value="Sugerencia">Sugerencia</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ubicación:</Form.Label>
              <MapPicker onLocationSelect={setSelectedLocation} /> 
            </Form.Group>
            <Form.Group>
              <Form.Label>Comentario:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe el problema"
                name="comentario"
                required
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Enviar Reporte
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportModal;
