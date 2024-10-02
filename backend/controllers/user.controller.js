const UserService = require('../services/user.service');

class UserController {
  static getAll(req, res) {
    UserService.getUsers((error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  static getUsersById(req, res) {
    const { userId } = req.params;

    UserService.getUsersById(userId, (error, result) => {

      if (error) {
        res.status(404).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  static searchUserByDNI(req, res) {
    const { dni } = req.params;

    UserService.findUserByDNI(dni, (error, result) => {
      if (error) {
        res.status(404).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  static updateUser(req, res) {
    const userData = req.body;
    UserService.updateUser(userData, (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  static updateEnableByAdmin(req, res) {
    const userData = req.body;
    UserService.updateEnableByAdmin(userData, (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  static updateComentarioByAdmin(req, res) {
    const userData = req.body;
    UserService.updateComentarioByAdmin(userData, (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

}

module.exports = UserController;
