import React from "react";

function UsersTable(props){
    return(
        <table className="table table-sm table-hover">
            <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>Email</th>
          <th>Domicilio</th>
          <th>Estado</th>
          <th>Comentarios</th>
        </tr>
      </thead>
            <tbody>
                {props.children}
          </tbody>
        </table>
    );
}

export { UsersTable};