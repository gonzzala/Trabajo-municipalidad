const AdminService = require('../services/admin.service');

class AdminController {

    static getAll(req, res) {
        AdminService.getAdmins((error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            res.status(200).json(results);
          }
        });
      }
      static createAdmin = async (req, res) => {
        const { idarea, nivel,nombre, mail, contraseña } = req.body;
    
        try {
            const result = await AdminService.createAdmin(idarea, nivel ,nombre, mail, contraseña);
            return res.status(200).json({ message: "Administrador creado exitosamente", data: result });
        } catch (error) {
            return res.status(500).json({ message: "Error en el servidor" });
        }
    };

static updateAdmin(req, res) {
    const adminData = req.body;

    AdminService.updateAdmin(adminData, (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

}

module.exports = AdminController;
