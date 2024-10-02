const recoveryService = require('../services/recovery.service');

module.exports = {
    requestRecovery: async (req, res) => {
        const { mail } = req.body;
    
        try {
            console.log(mail)
            await recoveryService.requestRecovery(mail);
            return res.status(200).json({ message: 'Solicitud de recuperación enviada con éxito.' });
        } catch (error) {
            if (error.isBoom) {
                // Si es un error de Boom, usar el mensaje proporcionado por el servicio
                return res.status(error.output.statusCode).json({ message: error.output.payload.message });
            } else {
                // Para otros errores, usar un mensaje genérico
                return res.status(500).json({ message: 'Error en el servidor al solicitar la recuperación.' });
            }
        }
    },
    

    resetPassword: async (req, res) => {
      const { token } = req.query;
      const { newPassword } = req.body;
      console.log(token, newPassword)

      try {
          await recoveryService.resetPassword(token, newPassword);
          return res.status(200).json({ message: 'Contraseña restablecida con éxito.' });
      } catch (error) {
          if (error.isBoom) {
              // Si es un error de Boom, usar el mensaje proporcionado por el servicio
              return res.status(error.output.statusCode).json({ message: error.output.payload.message });
          } else {
              // Para otros errores, usar un mensaje genérico
              return res.status(500).json({ message: 'Error en el servidor al restablecer la contraseña.' });
          }
      }
  },
};
