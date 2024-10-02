const jwt = require('jsonwebtoken');

function validatorAdmin(req, res, next) {
  const token = req.headers['access-token'];// habria que buscar el token en otro lado, ya que seguro no se encuentra en el header

  if (token) {
    jwt.verify(token, req.app.get('key'), (err, decoded) => {
      if (err) {
        res.status(500).json({ message: 'Error al verificar el token.' });
      } else {
        req.decoded = decoded;

        // Verifica si el rol del usuario es 'admin'
        if (req.decoded.role === 'admin') {
          // El usuario tiene el rol de administrador, permite el acceso
          next();
        } else {
          // El usuario no tiene el rol de administrador, devolver un error
          res.status(403).json({ message: 'Acceso denegado. Necesitas ser administrador.' });
        }
      }
    });
  } else {
    // El token no está presente, devolver un error
    res.status(401).json({ message: 'No estás autenticado.' });
  }
}

module.exports = validatorAdmin;

  