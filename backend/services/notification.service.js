const { sendEmail } = require('./AreasEmailSender');

class NotificationService {
  static async sendNewReportNotification(reportData, admins, users) {
    try {
      // Obtener información del área para encontrar al administrador

      if (admins && admins.length > 0) {
        const mailArea = admins.find((admin) => parseInt(admin.IdArea, 10) === parseInt(reportData.IdArea, 10));
        const userLogin = users.find((user) => parseInt(user.IdCiudadano, 10) === parseInt(reportData.IdCiudadano, 10));
        console.log('Admins obtenidos en NotificationService:', admins.map(admin => ({ IdAdmin: admin.IdAdmin, IdArea: admin.IdArea, Nombre: admin.Nombre, Mail: admin.Mail })));
        console.log('ReportData IdArea:', reportData);
        console.log('Admin encontrado:', mailArea);

        if (mailArea && mailArea.Mail) {
          const subject = 'Nuevo reclamo';
          const text = `Nuevo reclamo recibido en su área. Usuario: ${userLogin.Nombre} ${userLogin.Apellido} DNI:${userLogin.DNI} Mail:${userLogin.Mail} Comentario: (${reportData.TipoDeSituacion}) ${reportData.Comentario} - Coordenadas: ${reportData.Ubicacion}`;
          await sendEmail(mailArea.Mail, subject, text);
        } else {
          console.warn('No se encontró un administrador válido para el área especificada.');
        }
      }
    } catch (error) {
      console.error('Error al enviar la notificación por correo electrónico:', error);
    }
  }
}

module.exports = NotificationService;
