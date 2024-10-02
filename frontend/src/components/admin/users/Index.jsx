import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { UserRow } from "./UserRow";
import { UsersTable } from "./UsersTable";
import { Button } from "react-bootstrap";
import { getUsers, updateEnableByAdmin, updateComentarioByAdmin, findUserByDNI } from "../../../services/api";

export default function Users({ onGoBackToReports }) {
  const [users, setUsers] = useState([]);
  const [searchDNI, setSearchDNI] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeState = (IdCiudadano, enabled) => {
    const updatedEnabled = enabled === 1 ? 0 : 1;
    updateEnableByAdmin({ IdCiudadano, Enable: updatedEnabled }, (error, response) => {
      if (error) {
        console.error("Error al cambiar el estado:", error);
      } else {
        const updatedUsers = users.map((user) =>
          user.IdCiudadano === IdCiudadano ? { ...user, Enable: updatedEnabled } : user
        );
        setUsers(updatedUsers);
      }
    });
  };

  const handleEditComment = (updatedUser) => {
    updateComentarioByAdmin(updatedUser, (error, response) => {
      if (error) {
        console.error("Error al actualizar el comentario:", error);
      } else {
        const updatedUsers = users.map((user) =>
          user.IdCiudadano === updatedUser.IdCiudadano ? { ...user, Comentario: updatedUser.Comentarios } : user
        );
        setUsers(updatedUsers);
      }
    });
  };

  const handleSearch = async () => {
    setError(null); 
    if (searchDNI) {
      try {
        const response = await findUserByDNI(searchDNI);
        setSearchedUsers([response.data]);
      } catch (error) {
        console.error("Error al buscar usuario por DNI:", error);
        setError("Usuario no encontrado. Verifica el DNI e intenta nuevamente.");
      }
    } else {
      setSearchedUsers([]);
      setError("El campo de búsqueda está vacío. Ingresa un DNI válido.");
    }
  };

  const handleClearSearch = () => {

    setSearchDNI("");
    setSearchedUsers([]);
    setError(null);
  };

  return (
    <Container>
      <br />
      <br />
      <div>
        <input
          type="text"
          placeholder="Buscar por DNI"
          value={searchDNI}
          onChange={(e) => setSearchDNI(e.target.value)}
        />
        <Button onClick={handleSearch}>Buscar</Button>
        <Button onClick={handleClearSearch}>Limpiar búsqueda</Button>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <UsersTable>
        {searchedUsers.length > 0 ? (
          searchedUsers.map((user) => (
            <UserRow
              key={user.IdCiudadano}
              item={user}
              onChangeState={(enabled) =>
                handleChangeState(user.IdCiudadano, enabled)
              }
              onEditComment={handleEditComment}
            />
          ))
        ) : (
          users.map((user) => (
            <UserRow
              key={user.IdCiudadano}
              item={user}
              onChangeState={(enabled) =>
                handleChangeState(user.IdCiudadano, enabled)
              }
              onEditComment={handleEditComment}
            />
          ))
        )}
      </UsersTable>
    </Container>
  );
}
