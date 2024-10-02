import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import {
  getReports,
  updateReport,
  getAreas,
  getEstados,
  getReportsByIdAdmin,
} from "../../services/api";

const EditableReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [areas, setAreas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [editedArea, setEditedArea] = useState("");
  const [editedEstado, setEditedEstado] = useState("");
  const [sortConfig, setSortConfig] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const response = await getReportsByIdAdmin(userId);
      setReports(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  useEffect(() => {
    fetchData(userId);
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

  useEffect(() => {
    getEstados()
      .then((response) => {
        console.log(response.data);
        setEstados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener estados:", error);
      });
  }, []);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedArea(reports[index].IdArea);
    setEditedEstado(reports[index].IdEstado);
  };

  const handleSaveClick = async (index) => {
    setEditingIndex(-1);

    const updatedReport = {
      idReclamo: reports[index].IdReclamo,
      IdArea: editedArea,
      IdEstado: editedEstado,
    };

    try {
      await updateReport(updatedReport, (error, response) => {
        if (error) {
          console.error("Error al guardar el informe:", error);
        } else {
          console.log("Informe guardado exitosamente", response);
          fetchData();
        }
      });
    } catch (error) {
      console.error("Error al guardar el informe:", error);
    }
  };

  const onSort = (key) => {
    const existingConfigIndex = sortConfig.findIndex((config) => config.key === key);

    if (existingConfigIndex !== -1) {
      // Si ya existe, cambiar la dirección de ordenamiento
      const updatedConfig = [...sortConfig];
      updatedConfig[existingConfigIndex].direction =
        updatedConfig[existingConfigIndex].direction === "ascending"
          ? "descending"
          : "ascending";
      setSortConfig(updatedConfig);
    } else {
      // Si no existe, agregar el criterio de ordenamiento
      setSortConfig([...sortConfig, { key, direction: "ascending" }]);
    }
  };

  const getSortIcon = (key) => {
    const config = sortConfig.find((config) => config.key === key);
    if (config) {
      return config.direction === "ascending" ? "↑" : "↓";
    }
    return "";
  };

  const sortedReports = [...reports].sort((a, b) => {
    return sortConfig.reduce((acc, config) => {
      if (acc !== 0) return acc;

      const { key, direction } = config;

      if (direction === "ascending") {
        return a[key].localeCompare(b[key]);
      } else if (direction === "descending") {
        return b[key].localeCompare(a[key]);
      }

      return 0;
    }, 0);
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {/* Columna: Tipo de Servicio */}
          <th onClick={() => onSort("Area")}>
            Tipo de Servicio {getSortIcon("Area")}
          </th>
          {/* Columna: Situación Reportada */}
          <th onClick={() => onSort("Comentario")}>
            Situación Reportada {getSortIcon("Comentario")}
          </th>
          {/* Columna: Ubicación */}
          <th onClick={() => onSort("Ubicacion")}>
            Ubicación {getSortIcon("Ubicacion")}
          </th>
          {/* Columna: Fecha de Ingreso */}
          <th onClick={() => onSort("FechaReclamo")}>
            Fecha de Ingreso {getSortIcon("FechaReclamo")}
          </th>
          {/* Columna: Estado del Reporte */}
          <th onClick={() => onSort("Estado")}>
            Estado del Reporte {getSortIcon("Estado")}
          </th>
          {/* Columna: Fecha de Vencimiento */}
          <th onClick={() => onSort("FechaVencimiento")}>
            Fecha de Vencimiento {getSortIcon("FechaVencimiento")}
          </th>
          {/* Columna: Acciones */}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sortedReports.map((report, index) => (
          <tr key={report.IdReclamo}>
            <td>
              {editingIndex === index ? (
                <Form.Control
                  as="select"
                  value={editedArea}
                  onChange={(e) => setEditedArea(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione área
                  </option>
                  {areas.map((area) => (
                    <option key={area.IdArea} value={area.IdArea}>
                      {area.NombreA}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                report.Area
              )}
            </td>
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
            <td>
              {editingIndex === index ? (
                <Form.Control
                  as="select"
                  value={editedEstado}
                  onChange={(e) => setEditedEstado(e.target.value)}
                >
                  <option value="" disabled>
                    Estado
                  </option>
                  {estados.map((estado) => (
                    <option key={estado.IdEstado} value={estado.IdEstado}>
                      {estado.Nombre}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                report.Estado
              )}
            </td>
            <td>{new Date(report.FechaVencimiento).toLocaleDateString()}</td>
            <td>
              {editingIndex === index ? (
                <Button variant="primary" onClick={() => handleSaveClick(index)}>
                  Guardar
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleEditClick(index)}>
                  Editar
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EditableReportsTable;
