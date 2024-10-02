const db = require('../database'); 

class ReportService {
  static getAll(callback) {
    const query = 'SELECT R.*, A.NombreA AS Area, E.Nombre AS Estado FROM reclamos R JOIN areas A ON R.IdArea = A.IdArea JOIN estados E ON R.IdEstado = E.IdEstado'; 

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al consultar reclamos:', error);
        callback({ message: 'Error al consultar reclamos' }, null);
      } else {
        const reclamosActualizados = results.map((reclamo) => {
          if (reclamo.FechaVencimiento && new Date(reclamo.FechaVencimiento) < new Date()) {
            reclamo.Estado = "Vencido";
          }
          return reclamo;
        });

        callback(null, reclamosActualizados);
      }
    });
  }

  static getReportsById(IdCiudadano, callback) {
    const query = 'SELECT R.*, A.NombreA AS Area, E.Nombre AS Estado FROM reclamos R JOIN areas A ON R.IdArea = A.IdArea JOIN estados E ON R.IdEstado = E.IdEstado WHERE IdCiudadano = ?';
    
    db.query(query, [IdCiudadano], (error, results) => {
      if (error) {
        console.error('Error al consultar reclamos por IdCiudadano:', error);
        callback({ message: 'Error al consultar reclamos por IdCiudadano' }, null);
      } else {
        callback(null, results); 
      }
    });
  }

  static searchReportsByField(field, value, callback) {
    let query = 'SELECT R.*, A.NombreA AS Area, E.Nombre AS Estado FROM reclamos R JOIN areas A ON R.IdArea = A.IdArea JOIN estados E ON R.IdEstado = E.IdEstado';
  
    if (field !== 'all') {
      query += ` WHERE ${field} LIKE '%${value}%'`;
    }
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al buscar reclamos:', error);
        callback({ message: 'Error al buscar reclamos' }, null);
      } else {
        const reclamosActualizados = results.map((reclamo) => {
          if (reclamo.FechaVencimiento && new Date(reclamo.FechaVencimiento) < new Date()) {
            reclamo.Estado = 'Vencido';
          }
          return reclamo;
        });
        callback(null, reclamosActualizados);
      }
    });
  }
  
  static searchReportsByIdAdmin(userId, callback) {
    // Primero, obtenemos el IdArea del admin correspondiente al userId
    const getAdminAreaQuery = 'SELECT IdArea FROM admins WHERE IdAdmin = ?';
  
    db.query(getAdminAreaQuery, [userId], (adminError, adminResults) => {
      if (adminError) {
        console.error('Error al obtener el IdArea del admin:', adminError);
        callback({ message: 'Error al obtener el IdArea del admin' }, null);
      } else {
        if (adminResults.length === 0) {
          callback({ message: 'Admin no encontrado' }, null);
        } else {
          const adminIdArea = adminResults[0].IdArea;
  
          if (adminIdArea === 6) {
            // Si el IdArea es 6, mostrar todos los reclamos
            ReportService.getAll(callback);
          } else {
            const query = 'SELECT R.*, A.NombreA AS Area, E.Nombre AS Estado FROM reclamos R JOIN areas A ON R.IdArea = A.IdArea JOIN estados E ON R.IdEstado = E.IdEstado WHERE R.IdArea = ?';
  
            db.query(query, [adminIdArea], (error, results) => {
              if (error) {
                console.error('Error al buscar reclamos:', error);
                callback({ message: 'Error al buscar reclamos' }, null);
              } else {
                const reclamosActualizados = results.map((reclamo) => {
                  if (reclamo.FechaVencimiento && new Date(reclamo.FechaVencimiento) < new Date()) {
                    reclamo.Estado = 'Vencido';
                  }
                  return reclamo;
                });
                callback(null, reclamosActualizados);
              }
            });
          }
        }
      }
    });
  }
  

  static createReport(reportData, callback) {
    const query = 'INSERT INTO reclamos (TipoDeSituacion, Ubicacion, Comentario, IdCiudadano, IdArea, IdEstado) VALUES (?, ?, ?, ?, ?, ?)';

    const { TipoDeSituacion, Ubicacion, Comentario, IdCiudadano, IdArea, IdEstado} = reportData;

    db.query(query, [TipoDeSituacion, Ubicacion, Comentario, IdCiudadano, IdArea, IdEstado], (error, results) => {
      if (error) {
        console.error('Error al crear el reclamo:', error);
        callback({ message: 'Error al crear el reclamo' }, null);
      } else {
        callback(null, { message: 'Reclamo creado exitosamente' });
      }
    });
  }

  static updateReport(reportData, callback) {
    const { idReclamo, IdArea, IdEstado } = reportData;
  
    const query = 'UPDATE reclamos SET IdArea = ?, IdEstado = ? WHERE IdReclamo = ?';
  
    db.query(
      query,
      [IdArea, IdEstado, idReclamo],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar el informe:', error);
          callback({ message: 'Error al actualizar el informe' }, null);
        } else {
          callback(null, { message: 'Informe actualizado exitosamente' });
        }
      }
    );
  }
  
}

module.exports = ReportService;
