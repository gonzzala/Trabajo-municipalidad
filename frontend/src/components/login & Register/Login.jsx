import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import RegisterComponent from './Register';
import { useNavigate } from 'react-router-dom';
import RecuperacionForm from '../recovery & reset/RecoveryForm';
import LoginProblemsForm from './LoginProblemsForm';
import api from '../../services/api'

const LoginComponent = () => {
    const [mail, setMail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(null); // Estado para manejar el error
    const [show, setShow] = useState(false);
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [errorRegistro, setErrorRegistro] = useState(null); // Estado para manejar el error de registro

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const messageParam = urlParams.get('message');
    if (messageParam) {
      setMessage(messageParam);
    }
  }, []);
    
    const handleRegistroError = () => {
        setErrorRegistro('Error al registrarse. Por favor inténtalo de nuevo más tarde.');
      };

    const handleRegistroExitoso = () => {
        setRegistroExitoso(true);
      };
    
    const handleClose = () => {
        setShow(false);
        setError(null); // Reiniciar el error al cerrar el modal
    };
    const handleShow = () => setShow(true);
    

    const [showRecuperacionModal, setShowRecuperacionModal] = useState(false);

    const handleRecuperacionModalClose = () => setShowRecuperacionModal(false);
    const handleRecuperacionModalShow = () => setShowRecuperacionModal(true);


    const [showProblemsModal, setShowProblemsModal] = useState(false);

    const handleProblemsModalClose = () => setShowProblemsModal(false);
    const handleProblemsModalShow = () => setShowProblemsModal(true);


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/api/login/', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ mail: mail, contraseña: contraseña })
        })
            .then(response => {
                if (response.ok) return response.json();
                else throw new Error(response.json());
            })
            .then(data => {
                localStorage.loggedIn = true;
                localStorage.token = data.token;
                localStorage.setItem('userId', data.id);
// se puede acceder de esta forma: const userId = localStorage.getItem('userId');
api.defaults.headers['access-token'] = data.token;  // Configura el token para Axios
            if (data.role === 'admin') {
                if (data.nivel === 1) {
                    navigate("/admin");
                } else if (data.nivel === 2) {
                    navigate("/adminArea");} 
                } else {
                    navigate("/inicio");
            }
            })
            
            .catch((error) => {
                setError('Correo o contraseña incorrecta'); // Establece el error en caso de credenciales incorrectas
            });
    };
    return (
        <div>
        <div className="login-container">
            <Form className='login-form' onSubmit={handleSubmit}>
                <div className="login-contenido">
                    <h2 className='login-titulo'>
                        <img src="/Logo-Municipio-de-Azul-sinfondo.png" alt="logo" className='login-img' />
                    </h2>
                    {message && <Alert variant="success">{message}</Alert>}
                    {registroExitoso && (<Alert variant="success">Registro exitoso. Se ha enviado un mail para validar la cuenta.</Alert>)}
                    {errorRegistro && <Alert variant="danger">{errorRegistro}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>} {/* Mostrar el mensaje de error si existe */}
                    <div className="mb-3">
                        <label htmlFor="idEmail" className="form-label">Correo Electrónico</label>
                        <input type="email" required className="form-control" id="idEmail" aria-describedby="emailHelp" onChange={(e) => setMail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="idPassword" className="form-label">Contraseña</label>
                        <input type="password" required className="form-control" id="idPassword" onChange={(e) => setContraseña(e.target.value)} />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <Button type="submit" className="btn btn-primary">Iniciar sesión</Button>
                    </div>
                </div>
                <div className="text-center mt-2">
                <Button variant="link" className='recovery-link' onClick={handleRecuperacionModalShow}>
                Recuperar datos de ingreso
                </Button>
                </div>
                <div className="text-center mt-2">
                    <span>¿No tienes cuenta aún?</span>
                    <Button variant="link" className='register-link' onClick={handleShow}>
                        Registrate
                    </Button>
                </div>
                <RecuperacionForm showModal={showRecuperacionModal} handleClose={handleRecuperacionModalClose} />
                <RegisterComponent
                    show={show}
                    handleClose={handleClose}
                    handleRegistroExitoso={handleRegistroExitoso} // Pasa la función al componente de registro
                    handleRegistroError={handleRegistroError} // Pasa la función al componente de registro
                    />
            </Form>
        </div>
        <div className='problems-login'>
        <Button
            variant="primary"
            onClick={handleProblemsModalShow}
            className="problems-button">
            Tengo problemas para acceder o registrarme
        </Button>
        <LoginProblemsForm showModal={showProblemsModal} handleClose={handleProblemsModalClose} />
        </div>
        </div>
        
    );
};

export default LoginComponent;


