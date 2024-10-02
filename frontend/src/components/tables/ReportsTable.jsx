import React from 'react';
import { Table } from 'react-bootstrap';


const ReportsTable = (props) => {
  const { reports } = props; 

  if (!Array.isArray(reports)) {
    return null;
  }

  return (

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tipo de Servicio</th>
            <th>Situación Reportada</th>
            <th>Ubicación</th>
            <th>Fecha de Ingreso</th>
            <th>Estado del Reporte</th>
            <th>Fecha de Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.IdReclamo}>
              <td>{report.Area}</td>
              <td>{report.Comentario}</td>
              <td>
              <a
                href={`https://www.google.com/maps?q=${report.Ubicacion}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Google Maps
              </a>
            </td>
            <td>{new Date(report.FechaReclamo).toLocaleDateString()}</td>
              <td>{report.Estado}</td>
              <td>{new Date(report.FechaVencimiento).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
  );
};

export default ReportsTable;
