import React, { useState } from 'react';
import { BsFillTrashFill, BsPencilSquare, BsArrowUpSquareFill, BsArrowDownSquareFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function UserRow(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(props.item.Comentario);

  const handleEditComment = () => {
    setIsEditing(true);
  };

  const handleSaveComment = () => {
    const updatedUser = { IdCiudadano: props.item.IdCiudadano, Comentarios: comment };
    props.onEditComment(updatedUser);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setComment(props.item.Comentario);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>{props.item.IdCiudadano}</td>
      <td>{props.item.Nombre}</td>
      <td>{props.item.Apellido}</td>
      <td>{props.item.DNI}</td>
      <td>{props.item.Mail}</td>
      <td>
        <a
          href={`https://www.google.com/maps?q=${props.item.Direccion}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en Google Maps
        </a>
      </td>
      <td>
        <button onClick={() => props.onChangeState(props.item.Enable)} className='btn'>
          {props.item.Enable === 1 ? (
            <BsArrowDownSquareFill className="text-warning" />
          ) : (
            <BsArrowUpSquareFill className="text-success" />
          )}
        </button>
      </td>
      <td>
        {props.item.Comentarios}
        {isEditing ? (
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleSaveComment}>Guardar</button>
            <button onClick={handleCancelEdit}>Cancelar</button>
          </div>
        ) : (
          <div>
            {props.item.Comentario && !isEditing ? (
              <div>
                {props.item.Comentario}
                <button onClick={handleEditComment}>
                  <BsPencilSquare className="text-primary" />
                </button>
              </div>
            ) : (
              <div>
                <button onClick={handleEditComment}>
                  <BsPencilSquare className="text-primary" />
                </button>
              </div>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}


export { UserRow };
