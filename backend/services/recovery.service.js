const bcrypt = require('bcryptjs'); 
const boom = require('@hapi/boom');
const db = require('../database');
const { v4: uuidv4 } = require('uuid'); // Para generar tokens únicos
const nodemailer = require('nodemailer');

const sendRecoveryEmail = async (mail, userId) => {
    try {
      // Genera un token único para la recuperación
      const recoveryToken = uuidv4();
  
      // Almacena el token en la base de datos junto con una fecha de expiración
      await db.query('UPDATE ciudadanos SET RecoveryToken = ?, RecoveryTokenExpiry = ? WHERE IdCiudadano = ?', [recoveryToken, new Date().getTime() + 3600000, userId]);
  
      // URL de recuperación con el token
      const recoveryLink = `http://localhost:3000/newPassword?token=${recoveryToken}`;
  
      // Configuración del transporte de correo
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'reclamosmunicipalidaddeazul@gmail.com',
          pass: 'lufl nnsm kgmj kuar',
        },
      });
  
      // Contenido del correo electrónico
      const mailOptions = {
        from: 'reclamosmunicipalidaddeazul@gmail.com',
        to: mail,
        subject: 'Recuperación de Contraseña',
        html: `<div id="email___content">
                <img src="https://i.ibb.co/51VBSjd/Logo-Municipio-de-Azul-final.png" alt="Logo-Municipio-de-Azul">
                  <h2>Recuperación de Contraseña</h2>
                  <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                  <a href="${recoveryLink}" target="_blank">Restablecer Contraseña</a>
              </div>`,
      };
  
      // Envía el correo electrónico
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo electrónico de recuperación enviado:', info.response);
    } catch (error) {
      console.error('Error al enviar el correo electrónico de recuperación:', error);
      throw boom.badImplementation('Error interno al procesar la recuperación de contraseña.');
    }
  };

module.exports = {
    requestRecovery: async (email) => {
        try {
            // Convertir db.query en una promesa
            const queryPromise = (query, values) => {
                return new Promise((resolve, reject) => {
                    db.query(query, values, (error, results, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    });
                });
            };
    
            // Verificar si el correo electrónico existe en la base de datos
            const results = await queryPromise('SELECT IdCiudadano FROM ciudadanos WHERE Mail = ?', [email]);
    
            if (results.length > 0) {
                const user = results[0];
                console.log(user);
    
                // Enviar el correo electrónico de recuperación
                await sendRecoveryEmail(email, user.IdCiudadano);
    
                return { message: 'Solicitud de recuperación enviada con éxito.' };
            } else {
                throw boom.notFound('No se encontró un usuario con este correo electrónico.');
            }
        } catch (error) {
            throw boom.badRequest(error);
        }
    }
    ,

    resetPassword: async (token, newPassword) => {
      try {
          // Verificar si el token es válido y aún no ha expirado
          const queryPromise = (query, values) => {
              return new Promise((resolve, reject) => {
                  db.query(query, values, (error, results, fields) => {
                      if (error) {
                          reject(error);
                      } else {
                          resolve(results);
                      }
                  });
              });
          };
  
          const [user] = await queryPromise('SELECT IdCiudadano FROM ciudadanos WHERE RecoveryToken = ? AND RecoveryTokenExpiry > ?', [token, new Date().getTime()]);
  
          if (!user) {
              throw boom.badRequest('El token de recuperación no es válido o ha expirado.');
          }
  
          // Hashear la nueva contraseña antes de almacenarla
          const hashedPassword = await bcrypt.hash(newPassword, 10);
  
          // Actualizar la contraseña en la base de datos y limpiar el token de recuperación
          await queryPromise('UPDATE ciudadanos SET contraseña = ?, RecoveryToken = NULL, RecoveryTokenExpiry = NULL WHERE IdCiudadano = ?', [hashedPassword, user.IdCiudadano]);
  
          return { message: 'Contraseña restablecida con éxito.' };
      } catch (error) {
          throw boom.badRequest(error);
      }
  }
  
};
