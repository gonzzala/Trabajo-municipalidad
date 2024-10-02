const PlazoVtoService = require('../services/plazoVto.service');

class PlazoVtoController {
  static getPlazoVto(req, res) {
    PlazoVtoService.getPlazoVto((error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }


  static updatePlazoVto(req, res) {
    const plazoData = req.body;
    PlazoVtoService.updatePlazoVto(plazoData, (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

}

module.exports = PlazoVtoController;
