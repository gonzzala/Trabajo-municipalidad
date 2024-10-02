const bcrypt = require('bcryptjs'); 
const boom = require('@hapi/boom');
const db = require('../database');
const nodemailer = require('nodemailer');

const register = async (nombre, apellido, DNI, direccion, mail, contraseña, idpartido, enable) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(contraseña, 10, function(err, hash) {
            if (err) {
                reject(boom.internal('Error al encriptar la contraseña.'));
            } else {
                const query = 'INSERT INTO ciudadanos (Nombre, Apellido, DNI, Direccion, Mail, Contraseña, IdPartido, Enable) VALUES (?, ?, ?, ?, ?, ?,?,?)';
                db.query(query, [nombre, apellido, DNI, direccion, mail, hash, idpartido, enable], function (error, results, fields) {
                    if (error) {
                        reject(boom.badRequest(error));
                    } else {
                        const userId = results.insertId; // Obtener el ID del usuario registrado
                        const userName = nombre; // Obtener el nombre del usuario registrado
                        sendVerificationEmail(mail, userId, userName); // Llamar a la función para enviar el correo electrónico de verificación
                        console.log(mail,userId, userName);
                        resolve(results);
                    }
                });
            }
        });
    });
};

//Logica para el envio del mail

const sendVerificationEmail = async (email, userId, userName) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'reclamosmunicipalidaddeazul@gmail.com',
            pass: 'lufl nnsm kgmj kuar',
        },
    });

    const verificationLink = `http://localhost:4000/api/verify/${userId}`; // URL de verificación

    const mailOptions = {
        from: 'reclamosmunicipalidaddeazul@gmail.com',
        to: email,
        subject: 'Verificación de registro',
        html: `<div id="email___content">
                    <img src="https://i.ibb.co/51VBSjd/Logo-Municipio-de-Azul-final.png" alt="Logo-Municipio-de-Azul">
                    <h2>Hola ${userName}</h2>
                    <p>Muchas gracias por registrase en nuestra plataforma.
                    Para confirmar tu cuenta, ingresa al siguiente enlace:</p>
                    <a href="${verificationLink}" target="_blank">Confirmar Cuenta</a>
                </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
};

module.exports = { register };










/* const boom = require('@hapi/boom');
const db = require('../database');
const nodemailer = require('nodemailer');

const register = async (nombre, apellido, DNI, direccion, mail, contraeña, idpartido, enable) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO ciudadanos (Nombre, Apellido, DNI, Direccion, Mail, Contraeña, IdPartido, Enable) VALUES (?, ?, ?, ?, ?, ?,?,?)';
        db.query(query, [nombre, apellido, DNI, direccion, mail, contraeña, idpartido, enable], function (error, results, fields) {
            if (error) {
                reject(boom.badRequest(error));
            } else {
                
                const userId = results.insertId; // Obtener el ID del usuario registrado
                const userName = nombre; // Obtener el nombre del usuario registrado
                sendVerificationEmail(mail, userId, userName); // Llamar a la función para enviar el correo electrónico de verificación
                console.log(mail,userId, userName)
                resolve(results);
            }
        });
    });
}; */