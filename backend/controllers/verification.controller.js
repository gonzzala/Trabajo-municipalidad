const verificationService = require('../services/verification.service');

const verifyEmail = async (req, res) => {
    const userId = req.params.userId;

    try {
        await verificationService.verifyEmail(userId);
        return res.redirect('http://localhost:3000?message=Verificación exitosa. Puedes iniciar sesión ahora.');
    } catch (error) {
        return res.redirect('http://localhost:3000?message=Error en la verificación. Inténtalo de nuevo más tarde.');
    }
};

module.exports = { verifyEmail };
