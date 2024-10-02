const loginService = require('../services/login.service');
const loginProblemsService = require('../services/loginProblems.service');

module.exports = {
  login: async (req, res) => {
    const { mail, contraseña } = req.body;
    try {
      const result = await loginService.login(mail, contraseña);
      const payload = { check: true, role: result.role, nivel: result.nivel }; 
      const token = jwt.sign(payload, req.app.get('key'), { expiresIn: 1440 });
      return res.status(200).json({ id: result.id, role: result.role, nivel: result.nivel || undefined, message: result.message, token: token });
    } catch (error) {
      if (error.isBoom) {
        return res.status(error.output.payload.statusCode).json({ message: error.output.payload.message }); 
      } else {
        return res.status(500).json({ message: "Error en el servidor!" });
      }
    }
  },

  reportProblems: async (req, res) => {
    const { problema, nombre, documento, mail, comentario } = req.body;

    try {
      console.log(problema, nombre, documento, mail, comentario)
        const result = await loginProblemsService.reportProblems(problema, nombre, documento, mail, comentario);
        return res.status(200).json({ message: "Problema reportado con éxito", data: result });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor al reportar problemas" });
    }
}

};



















/* const loginService = require('../services/login.service');

module.exports = {
  login: async (req, res) => {
    const { mail, contraseña } = req.body;
    try {
      const result = await loginService.login(mail, contraseña);
      const payload = { check: true };
      const token = jwt.sign(payload, req.app.get('key'), { expiresIn: 1440 });
      return res.status(200).json({ id: result.id, message: "Inicio de sesión exitoso", token: token });
    } catch (error) {
      if (error.isBoom) {
        return res.status(error.output.payload.statusCode).json(error.output.payload.message);
      } else {
        return res.status(500).json({ message: "Error en el servidor!" });
      }
    }
  }
}; */

