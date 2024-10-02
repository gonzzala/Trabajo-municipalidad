const registerService = require('../services/register.service');

const register = async (req, res) => {
    const { nombre, apellido, DNI, direccion, mail, contraseña, idpartido, enable } = req.body;

    try {
        console.log(nombre, apellido, DNI, direccion, mail, contraseña, idpartido, enable)
        const result = await registerService.register(nombre, apellido, DNI, direccion, mail, contraseña, idpartido, enable);
        return res.status(200).json({ message: "Registro exitoso", data: result });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = { register };
