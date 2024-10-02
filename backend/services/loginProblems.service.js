const nodemailer = require('nodemailer');
const boom = require('@hapi/boom');

const reportProblems = async (problema, nombre, documento, mail, comentario) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: mail, //correo de la persona que reporta el problema
            to: 'reclamosmunicipalidaddeazul@gmail.com', 
            subject: 'Problemas de acceso o registro reportados',
            html: `<div id="email___content">
                        <h2>Problema: ${problema} </h2>
                        <p>Nombre: ${nombre}</p>
                        <p>Documento: ${documento}</p>
                        <p>Correo: ${mail}</p>
                        <p>Descripción del problema: ${comentario}</p>
                    </div>`,
        };

        // Configuración del transporte de correo
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'reclamosmunicipalidaddeazul@gmail.com',
                pass: 'lufl nnsm kgmj kuar',
            },
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                reject(boom.badImplementation('Error interno al enviar el correo.'));
            } else {
                console.log('Correo electrónico enviado:', info.response);
                resolve(info.response);
            }
        });
    });
};

module.exports = { reportProblems };
