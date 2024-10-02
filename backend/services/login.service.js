const bcrypt = require('bcryptjs')
const boom = require('@hapi/boom');
const db = require('../database');

module.exports = {
  login: async (mail, contraseña) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT IdCiudadano, Nombre, Enable, Contraseña FROM ciudadanos WHERE Mail = ?', [mail], function (error, results, fields) {
        if (error) {
          reject(boom.badRequest(error));
        } else {
          if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(contraseña, user.Contraseña, function(err, isMatch) {
              if (err) {
                reject(boom.internal('Error al comparar contraseñas.'));
              }
              if (isMatch) {
                if (user.Enable === 1) {
                  reject(boom.unauthorized("El acceso está denegado para este usuario."));
                } else {
                  resolve({ id: user.IdCiudadano, role: 'user', message: "Inicio de sesión exitoso como usuario" });
                }
              } else {
                reject(boom.unauthorized("Credenciales incorrectas."));
              }
            });
          } else {
            db.query('SELECT IdAdmin, Nombre, Contraseña, Nivel FROM admins WHERE Mail = ?', [mail], function (error, results, fields) {
              if (error) {
                reject(boom.badRequest(error));
              } else {
                if (results.length > 0) {
                  const admin = results[0];
                  bcrypt.compare(contraseña, admin.Contraseña, function(err, isMatch) {
                    if (err) {
                      reject(boom.internal('Error al comparar contraseñas.'));
                    }
                    if (isMatch) {
                      resolve({ id: admin.IdAdmin, role: 'admin', nivel: admin.Nivel, message: "Inicio de sesión exitoso como administrador" });
                    } else {
                      reject(boom.unauthorized("Credenciales de administrador incorrectas."));
                    }
                  });
                } else {
                  reject(boom.unauthorized("Acceso denegado"));
                }
              }
            });
          }
        }
      });
    });
  }
};






























/* const boom = require('@hapi/boom');
const db = require('../database');

module.exports = {
  login: async (mail, contraseña) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT IdCiudadano, Nombre, Enable FROM ciudadanos WHERE Mail = ? AND Contraeña = ?', [mail, contraseña], function (error, results, fields) {
        if (error) {
          reject(boom.badRequest(error));
        } else {
          if (results.length > 0) {
            const user = results[0];
            if (user.Enable === 0) {
              reject(boom.unauthorized("El acceso está denegado para este usuario."));
            } else {
              resolve({ id: user.IdCiudadano, role: 'user', message: "Inicio de sesión exitoso como usuario" });
            }
          } else {
            db.query('SELECT IdAdmin, Nombre FROM admins WHERE Mail = ? AND Contraseña = ?', [mail, contraseña], function (error, results, fields) {
              if (error) {
                reject(boom.badRequest(error));
              } else {
                if (results.length > 0) {
                  resolve({ id: results[0].IdAdmin, role: 'admin', message: "Inicio de sesión exitoso como administrador" });
                } else {
                  reject(boom.unauthorized("Acceso denegado"));
                }
              }
            });
          }
        }
      });
    });
  }
}; */




























/* const boom = require('@hapi/boom');
const db = require('../database');

module.exports = {
  login: async (mail, contraseña) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT IdCiudadano, Nombre FROM ciudadanos WHERE Mail = ? AND Contraeña = ?', [mail, contraseña], function (error, results, fields) {
        if (error) {
          reject(boom.badRequest(error));
        } else {
          if (results.length > 0) {
            resolve({ id: results[0].IdCiudadano, message: "Inicio de sesión exitoso" });
          } else {
            reject(boom.unauthorized("Acceso denegado"));
          }
        }
      }); 
    });
  }
}; */
