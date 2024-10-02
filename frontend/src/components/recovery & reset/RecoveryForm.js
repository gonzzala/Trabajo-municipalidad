import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const RecuperacionForm = ({ showModal, handleClose }) => {
    const [emailRecuperacion, setEmailRecuperacion] = useState("");
    const [errorRecuperacion, setErrorRecuperacion] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleRecuperacionSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/api/recovery/request', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ mail: emailRecuperacion }),
        })
            .then(response => {
                if (response.ok) {
                    setSuccessMessage('Solicitud de recuperación enviada con éxito.');
                    setErrorRecuperacion(null);
                } else {
                    throw new Error(response.json());
                }
            })
            .catch(error => {
                setErrorRecuperacion('Error al enviar la solicitud de recuperación. Por favor, inténtalo de nuevo más tarde.');
                setSuccessMessage(null);
            });
    };

    return (
        <Modal show={showModal} onHide={handleClose} className='modalrc-container'>
            <Modal.Header closeButton>
                <Modal.Title>Recuperar datos de ingreso</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalrc-content">
                <Form onSubmit={handleRecuperacionSubmit}>
                {errorRecuperacion && <Alert variant="danger">{errorRecuperacion}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    <Form.Group controlId="formEmailRecuperacion" className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Ingrese su correo electrónico" value={emailRecuperacion} onChange={(e) => setEmailRecuperacion(e.target.value)} required />
                    </Form.Group>

                    <Button className='recover-button' variant="primary" type="submit">
                        Enviar solicitud de recuperación
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RecuperacionForm;
