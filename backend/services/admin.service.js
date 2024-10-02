const bcrypt = require('bcryptjs')
const boom = require('@hapi/boom');
const db = require('../database');

class AdminService {

    static getAdmins(callback) {
        const query = 'SELECT * FROM admins';
    
        db.query(query, (error, results) => {
          if (error) {
            console.error('Error al consultar admins:', error);
            callback({ message: 'Error al consultar admins' }, null);
          } else {
            callback(null, results);
          }
        });
      }

      static createAdmin = async (idarea, nivel ,nombre, mail, contraseña) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(contraseña, 10, function(err, hash) {
                if (err) {
                    reject(boom.internal('Error al encriptar la contraseña.'));
                } else {
                    const query = 'INSERT INTO admins (IdArea,Nivel,Nombre,Mail,contraseña) VALUES (?, ?, ?, ?, ?)';
                    db.query(query, [idarea, nivel ,nombre, mail, hash], function (error, results, fields) {
                        if (error) {
                            reject(boom.badRequest(error));
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });
    };

static updateAdmin(adminData, callback) {
    const { IdAdmin, IdArea, Nivel, Mail, Nombre } = adminData;
  
    const query = 'UPDATE admins SET IdArea = ?, Nivel = ?, Mail = ?, Nombre = ? WHERE IdAdmin = ?';
  
    db.query(
      query,
      [IdArea, Nivel, Mail, Nombre, IdAdmin],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar admin:', error);
          callback({ message: 'Error al actualizar admin' }, null);
        } else {
          callback(null, { message: 'Admin actualizado exitosamente' });
        }
      }
    );
  }

}
module.exports = AdminService;
