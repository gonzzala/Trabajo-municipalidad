import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UserProfile.css";
import MapPicker from '../LocationSearchInput';
import { getUsersById, updateUser } from '../../services/api';

const UserProfile = () => {


  const [showEditModal, setShowEditModal] = useState(false);
  const userId = localStorage.getItem('userId');
  const [IdCiudadano, setIdCiudadano] = useState(userId);
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({
    Nombre: user.Nombre,
    Apellido: user.Apellido,
    DNI: user.DNI,
    Direccion: user.Direccion,
    IdPartido: user.IdPartido,
    Mail: user.Mail,
    Contraseña: user.Contraseña,
  });

  const partidoOptions = [
    { id: '1', name: 'Azul' },
    { id: '2', name: 'Cacharí' },
    { id: '3', name: 'Chillar' },
  ];
  const [selectedLocation, setSelectedLocation] = useState(user.Direccion); 
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleSaveClick = async () => {
    const updatedUser = {
      IdCiudadano: user.IdCiudadano,
      Nombre: editedUser.Nombre,
      Apellido: editedUser.Apellido,
      DNI: editedUser.DNI,
      // Utiliza el formato de coordenadas adecuado en Direccion
      Direccion: selectedLocation ? `${selectedLocation.lat}, ${selectedLocation.lng}` : '',
      IdPartido: editedUser.IdPartido,
      Mail: editedUser.Mail,
      Contraseña: editedUser.Contraseña,
    };
    try {
      await updateUser(updatedUser, (error, response) => {
        if (error) {
          console.error('Error al guardar datos:', error);
        } else {
          console.log('Datos guardados exitosamente', response);
        }
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  };

  const handleCancelClick = () => {
    setShowEditModal(false);
  };
  useEffect(() => {
    getUsersById(userId)
      .then((response) => {
        const userData = response.data[0];
        setUser(userData);
        setEditedUser(userData);
        // Utiliza el formato de coordenadas adecuado en selectedLocation
        setSelectedLocation(
          userData.Direccion
            ? {
                lat: parseFloat(userData.Direccion.split(',')[0].trim()),
                lng: parseFloat(userData.Direccion.split(',')[1].trim()),
              }
            : null
        );
      })
      .catch((error) => {
        console.error('Error al obtener usuario:', error);
      });
  }, []);

  useEffect(() => {
    if (user.Direccion) {
      setEditedUser({ ...editedUser, Direccion: user.Direccion });
      setSelectedLocation( selectedLocation ? `${selectedLocation.lat}, ${selectedLocation.lng}` : '');
    }
  }, [user]);

console.log(userId);


  return (
    <div className='profileDetails'>
      <div>
        <h2>Usuario</h2>
        <p>Nombre: {editedUser.Nombre}</p>
        <p>Apellido: {editedUser.Apellido}</p>
        <p>Email: {editedUser.Mail}</p>
        <p>Dirección: <a
                href={`https://www.google.com/maps?q=${user.Direccion}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Google Maps
              </a></p>
      </div>
      <div>
        <img className='userImg' src="/User.png" alt="" />
        <br />
        <br />
        <Button variant="primary" onClick={handleEditClick}>
          Editar Perfil
        </Button>
      </div>

      <Modal show={showEditModal} onHide={handleCancelClick}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={editedUser.Nombre}
              onChange={(e) => setEditedUser({ ...editedUser, Nombre: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              value={editedUser.Apellido}
              onChange={(e) => setEditedUser({ ...editedUser, Apellido: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              value={editedUser.DNI}
              onChange={(e) => setEditedUser({ ...editedUser, DNI: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
              <Form.Label>Dirección:</Form.Label>
              <MapPicker value={selectedLocation} onLocationSelect={setSelectedLocation} /> 
            </Form.Group>
            <Form.Group></Form.Group>
          <Form.Group>
            <Form.Label>Partido</Form.Label>
            <Form.Control
              as="select"
              value={editedUser.IdPartido}
              onChange={(e) => setEditedUser({ ...editedUser, IdPartido: e.target.value })}
            >
              {partidoOptions.map((partido) => (
                <option key={partido.id} value={partido.id}>
                  {partido.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editedUser.Mail}
              onChange={(e) => setEditedUser({ ...editedUser, Mail: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={editedUser.Contraseña}
              onChange={(e) => setEditedUser({ ...editedUser, Contraseña: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClick}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}; 

export default UserProfile;
