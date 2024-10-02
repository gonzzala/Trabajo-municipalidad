const AreaService = require('../services/area.service');

class AreaController {
  static getAll(req, res) {
    AreaService.getAreas((error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

static getAreasByIdAdmin(req, res) {
  const { userId } = req.params;

  AreaService.getAreasByIdAdmin(userId, (error, result) => {

    if (error) {
      res.status(404).json(error);
    } else {
      res.status(200).json(result);
    }
  });
}

static createArea(req, res) {
  const { NombreA } = req.body;

  AreaService.createArea(NombreA, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(201).json(result);
    }
  });
}

static updateArea(req, res) {
  const { id } = req.params;
  const { NombreA } = req.body;

  AreaService.updateArea(id, NombreA, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Área no encontrada' });
    } else {
      res.status(200).json({ message: 'Área actualizada exitosamente' });
    }
  });
}

static deleteArea(req, res) {
  const { id } = req.params;

  AreaService.deleteArea(id, (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Área no encontrada' });
    } else {
      res.status(200).json({ message: 'Área eliminada exitosamente' });
    }
  });
}
}


module.exports = AreaController;
