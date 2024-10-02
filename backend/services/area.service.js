const db = require('../database');

class AreaService {
  static getAreas(callback) {
    const query = 'SELECT * FROM areas';

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al consultar áreas:', error);
        callback({ message: 'Error al consultar áreas' }, null);
      } else {
        callback(null, results);
      }
    });
  }
  static createArea(NombreA, callback) {
    const query = 'INSERT INTO areas (NombreA) VALUES (?)';
    const values = [NombreA];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error al crear área:', error);
        callback({ message: 'Error al crear área' }, null);
      } else {
        callback(null, { message: 'Área creada exitosamente', insertId: result.insertId });
      }
    });
  }

  static updateArea(id, NombreA, callback) {
    const query = 'UPDATE areas SET NombreA = ? WHERE IdArea = ?';
    const values = [NombreA, id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error al actualizar área:', error);
        callback({ message: 'Error al actualizar área' }, null);
      } else {
        callback(null, result);
      }
    });
  }

  static deleteArea(id, callback) {
    const query = 'DELETE FROM areas WHERE IdArea = ?';
    const values = [id];

    db.query(query, values, (error, result) => {
      if (error) {
        console.error('Error al eliminar área:', error);
        callback({ message: 'Error al eliminar área' }, null);
      } else {
        callback(null, result);
      }
    });
  }
}

module.exports = AreaService;
