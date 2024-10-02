import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


//funcion para mostrar el mensaje
const InfoMessage = ({ message, onClose }) => (
  <Alert variant="info" onClose={onClose} dismissible>
      {message}
  </Alert>
);

const ResetPasswordForm = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  //estado para manejar la visibilidad del mensaje
  const [showInfo, setShowInfo] = useState(true);

//efecto para mostrar el mensaje informativo por un tiempo y despues ocultarlo
useEffect(() => {
  const timeout = setTimeout(() => {
      setShowInfo(false);
  }, 5000);  // Ocultar el mensaje después de 5 segundos

  return () => clearTimeout(timeout);
}, []);


  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/recovery/reset?token=${token}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        setSuccessMessage('Contraseña restablecida con éxito.');
        setError(null);
      } else {
        throw new Error(await response.json());
      }
    } catch (error) {
      setError('Error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.');
      setSuccessMessage(null);
    }
  };

//establece ShowInfo en falso para que no se muestre
const handleCloseInfo = () => {
  setShowInfo(false);
};


  return (
    <div className="reset-password-container">

      <Form onSubmit={handleResetPassword} className='reset-password-form'>
        
      <img src="/Logo-Municipio-de-Azul-sinfondo.png" alt="logo" className='reset-img' />
        <div className='reset-password-contenido'>
        {/* si ShowInfo es true se muestra el mensaje */}
        {showInfo && <InfoMessage message="¡Hola de nuevo! Ingresa tu nueva contraseña para poder acceder a tu cuenta." onClose={handleCloseInfo} />}
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form.Group controlId="formNewPassword" className="mb-3">
          <Form.Label>Nueva Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingrese la nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="reset-password-button">
          Restablecer Contraseña
        </Button>
        <Link to="/" className='reset-password-link'>
            <Button variant="link" className='reset-password-secondlink'>
              Volver al Inicio
            </Button>
        </Link>
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;

