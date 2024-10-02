const db = require('../database');

class PartidoService {
  static getPartidos(callback) {
    const query = 'SELECT * FROM partidos';

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al consultar partidos:', error);
        callback({ message: 'Error al consultar partidos' }, null);
      } else {
        callback(null, results);
      }
    });
  }
}

module.exports = PartidoService;
