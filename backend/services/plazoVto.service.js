const db = require('../database');

class PlazoVtoService {
  static getPlazoVto(callback) {
    const query = 'SELECT * FROM plazovencimiento WHERE IdPlazo = 1';

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al consultar plazo:', error);
        callback({ message: 'Error al consultar plazo' }, null);
      } else {
        callback(null, results);
      }
    });
  }

  static updatePlazoVto(plazoData, callback) {
    const { IdPlazo, Dias } = plazoData;
  
    const query = 'UPDATE plazovencimiento SET Dias = ? WHERE IdPlazo = 1';
  
    db.query(
      query,
      [Dias, IdPlazo],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar el plazo:', error);
          callback({ message: 'Error al actualizar el plazo' }, null);
        } else {
          callback(null, { message: 'Plazo vencimiento actualizado exitosamente!' });
        }
      }
    );
  }

}

module.exports = PlazoVtoService;