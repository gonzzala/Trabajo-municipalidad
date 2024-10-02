const PartidoService = require('../services/partido.service');

class PartidoController {
  static getAll(req, res) {
    PartidoService.getPartidos((error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }
}

module.exports = PartidoController;
