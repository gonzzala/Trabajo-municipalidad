const ReportService = require('../services/report.service');
const { sendEmail } = require('../services/AreasEmailSender');
const NotificationService = require('../services/notification.service');
const AdminService = require('../services/admin.service');
const UserService = require('../services/user.service');


class ReportController {
  static getAll(req, res) {
    ReportService.getAll((error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  static getReportsById(req, res) {
    const IdCiudadano = req.params.userId; 

    ReportService.getReportsById(IdCiudadano, (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  static searchReports(req, res) {
    const { field, value } = req.body;
  
    ReportService.searchReportsByField(field, value, (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }
  
  static getReportsByIdAdmin(req, res) {
    const userId = req.params.userId;
  
    ReportService.searchReportsByIdAdmin(userId, (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }
  
  
  static async createReport(req, res) {
    const reportData = req.body;
  
    try {
      const result = await new Promise((resolve, reject) => {
        ReportService.createReport(reportData, async (error, data) => {
          if (error) {
            console.error('Error al crear el reporte:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            reject(error);
          } else {
            // Obtener admins antes de enviar la notificación
            try {
              const admins = await new Promise((resolve, reject) => {
                AdminService.getAdmins((error, admins) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(admins);
                  }
                });
              });
  
              console.log('Admins obtenidos:', admins);
  
              // Obtener users
              try {
                const users = await new Promise((resolve, reject) => {
                  UserService.getUsers((error, users) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(users);
                    }
                  });
                });
  
                console.log('Users obtenidos:', users);
  
                // Enviar notificación al administrador 
                NotificationService.sendNewReportNotification(reportData, admins, users);
  
              } catch (error) {
                console.error('Error al obtener users:', error);
              }
  
            } catch (error) {
              console.error('Error al obtener admins:', error);
            }
  
            res.status(201).json(data);
            resolve(data);
          }
        });
      });
    } catch (error) {
      console.error('Error al crear el reporte y enviar la notificación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  



  static updateReport(req, res) {
    const reportData = req.body;

    ReportService.updateReport(reportData, (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }
}

module.exports = ReportController;
