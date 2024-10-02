const db = require('../database');

class EstadoService {
  static getEstados(callback) {
    const query = 'SELECT * FROM estados';

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al consultar estados:', error);
        callback({ message: 'Error al consultar estados' }, null);
      } else {
        callback(null, results);
      }
    });
  }
}

module.exports = EstadoService;