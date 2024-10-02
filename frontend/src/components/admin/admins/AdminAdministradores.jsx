import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import NewAdminForm from './NewAdminForm';
import { getAdmins, getAreas, updateAdmin } from '../../../services/api';

const AdminAdministradores = () => {
  const [admins, setAdmins] = useState([]);
  const [areas, setAreas] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getAdmins();
      setAdmins(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getAreas()
      .then((response) => {
        setAreas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener áreas:", error);
      });
  }, []);


  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showNewAdminForm, setShowNewAdminForm] = useState(false);

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
  };

  const handleCloseEdit = () => {
    setEditingAdmin(null);
  };

  const handleSaveEdit = async () => {
    try {
      const { IdAdmin, Nivel, IdArea, Mail, Nombre } = editingAdmin;
      
      const updatedAdmin = {
        IdAdmin,
        Nivel,
        IdArea,
        Mail,
        Nombre,
      };
  
      await updateAdmin(updatedAdmin, (error, response) => {
        if (error) {
          console.error("Error al guardar Admin:", error);
        } else {
          console.log("Admin guardado exitosamente", response);
          handleCloseEdit();

          setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.IdAdmin === IdAdmin ? { ...admin, ...updatedAdmin } : admin
          )
        );
 /*          const updatedAdmins = getAdmins();
        setAdmins(updatedAdmins.data);
          fetchData();  */
        }
      });
    } catch (error) {
      console.error("Error al guardar Admin:", error);
    }
  };
  

  return (
    <div>
      <Button onClick={() => setShowNewAdminForm(true)}>Crear Nuevo Administrador</Button>
      <br />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Administrador</th>
            <th>Nombre</th>
            <th>Mail</th>
            <th>Area</th>
            <th>Acceso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
          <tr key={admin?.IdAdmin || index}>
            <td>{admin?.IdAdmin }</td>
            <td>{admin?.Nombre }</td>
            <td>{admin?.Mail }</td>
            <td>{areas.find((area) => area.IdArea === admin?.IdArea)?.NombreA}</td>
            <td>{admin?.Nivel === 1 ? 'Administrador General' : 'Administrador De Área'}</td>
            <td>
              <Button onClick={() => handleEditAdmin(admin)}>Editar</Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      <Modal show={editingAdmin !== null} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Acceso</Form.Label>
            <Form.Control
              as="select"
              value={editingAdmin?.Nivel}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, Nivel: e.target.value })
              }
            >
              <option value="1">Administrador General</option>
              <option value="2">Administrador De Area</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Area</Form.Label>
            <Form.Control
              as="select"
              value={editingAdmin?.IdArea }
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, IdArea: e.target.value })
              }
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
              value={editingAdmin?.Mail}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, Mail: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={editingAdmin?.Nombre}
              onChange={(e) =>
                setEditingAdmin({ ...editingAdmin, Nombre: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <NewAdminForm
  areas={areas}
  show={showNewAdminForm}
  onHide={async () => {
    setShowNewAdminForm(false);
    await fetchData();
  }}
  onCreateAdmin={(newAdmin) => {
    setAdmins([...admins, newAdmin]);
  }}
/>
    </div>
  );
};

export default AdminAdministradores;
