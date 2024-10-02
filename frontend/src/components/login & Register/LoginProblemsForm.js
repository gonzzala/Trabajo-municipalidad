import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const LoginProblemsModal = ({ showModal, handleClose }) => {
    const [problema, setProblema] = useState('');
    const [nombre, setNombre] = useState('');
    const [documento, setDocumento] = useState('');
    const [mail, setMail] = useState('');
    const [comentario, setComentario] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleProblemaSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:4000/api/login/login-problems', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ problema, nombre, documento, mail, comentario }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message);
                setErrorMessage(null);
            } else {
                throw new Error(await response.json());
            }
        } catch (error) {
            setErrorMessage('Error al reportar el problema. Por favor, inténtalo de nuevo más tarde.');
            setSuccessMessage(null);
        }
    };
    return (
        <Modal show={showModal} onHide={handleClose} className='modalpr-container'>
            <Modal.Header closeButton>
                <Modal.Title>Tengo problemas para acceder o registrarme</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalpr-content">
                <Form onSubmit={handleProblemaSubmit}>
                    <Form.Group controlId="formProblema">
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        <Form.Label>Problema</Form.Label>
                        <Form.Control as="select" onChange={(e) => setProblema(e.target.value)} required>
                            <option value="" disabled selected>Selecciona una opción</option>
                            <option value="Email ya registrado">Mi email ya se encuentra registrado</option>
                            <option value="Documento ya registrado">Nº de documento registrado</option>
                            <option value="Recuperar datos de acceso">No puedo recuperar mis datos de acceso</option>
                            <option value="Otro">Otro</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese su nombre" onChange={(e) => setNombre(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDocumento">
                        <Form.Label>Número de Documento</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese su número de documento" onChange={(e) => setDocumento(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formMail">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Ingrese su correo electrónico" onChange={(e) => setMail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formComentario" className="mb-3">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Ingrese su comentario" onChange={(e) => setComentario(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='problem-button'>
                        Enviar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginProblemsModal;
