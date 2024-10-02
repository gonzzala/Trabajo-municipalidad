const db = require('../database');

class UserService {
  static getUsers(callback) {
    const query = 'SELECT * FROM ciudadanos';

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error al consultar ciudadanos', error);
        callback({ message: 'Error al consultar ciudadanos' }, null);
      } else {
        callback(null, results);
      }
    });
  }
    static getUsersById(userId, callback) {
      const query = 'SELECT * FROM ciudadanos where IdCiudadano = ?';
  
      db.query(query, [userId], (error, results) => {
        if (error) {
          console.error('Error al consultar ciudadanos', error);
          callback({ message: 'Error al consultar ciudadanos' }, null);
        } else {
          callback(null, results);
        }
      });
    }

    static findUserByDNI(dni, callback) {
        const query = 'SELECT * FROM ciudadanos WHERE DNI = ?';
        db.query(query, [dni], (error, results) => {
          if (error) {
            console.error('Error al buscar usuario por DNI', error);
            callback({ message: 'Error al buscar usuario por DNI' }, null);
          } else {
            if (results.length > 0) {
              callback(null, results[0]);
            } else {
              callback({ message: 'Usuario no encontrado' }, null);
            }
          }
        });
      }

  static updateUser(userData, callback) {
    const { IdCiudadano, Nombre, Apellido, DNI, Direccion, IdPartido, Mail, Contraseña } = userData;
  
    const query = 'UPDATE ciudadanos SET Nombre = ?, Apellido = ?, DNI = ?, Direccion = ?, IdPartido = ?, Mail = ?, Contraseña = ? WHERE IdCiudadano = ?';
  
    db.query(
      query,
      [Nombre, Apellido, DNI, Direccion, IdPartido, Mail, Contraseña, IdCiudadano],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar datos:', error);
          callback({ message: 'Error al actualizar datos' }, null);
        } else {
          callback(null, { message: 'Datos actualizados exitosamente' + IdCiudadano  });
        }
      }
    );
  }

  static updateEnableByAdmin(userData, callback) {
    const { IdCiudadano, Enable } = userData;
  
    const query = 'UPDATE ciudadanos SET Enable = ? WHERE IdCiudadano = ?';
  
    db.query(
      query,
      [Enable, IdCiudadano],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar el estado:', error);
          callback({ message: 'Error al actualizar el estado' }, null);
        } else {
          callback(null, { message: 'Estado actualizado exitosamente para el usuario con IdCiudadano ' + IdCiudadano });
        }
      }
    );
  }
  
  static updateComentarioByAdmin(userData, callback) {
    const { IdCiudadano, Comentarios } = userData;
  
    const query = 'UPDATE ciudadanos SET Comentarios = ? WHERE IdCiudadano = ?';
  
    db.query(
      query,
      [Comentarios, IdCiudadano],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar los comentarios:', error);
          callback({ message: 'Error al actualizar los comentarios' }, null);
        } else {
          callback(null, { message: 'Comentarios actualizados exitosamente para el usuario con IdCiudadano ' + IdCiudadano });
        }
      }
    );
  }
  

}

module.exports = UserService;
