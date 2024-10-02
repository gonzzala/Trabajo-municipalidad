const EstadoService = require('../services/estado.service');

class EstadoController {
  static getAll(req, res) {
    EstadoService.getEstados((error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }
}

module.exports = EstadoController;
