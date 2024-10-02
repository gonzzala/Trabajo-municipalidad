const boom = require('@hapi/boom');
const db = require('../database');

const verifyEmail = async (userId) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE ciudadanos SET Enable = 0 WHERE IdCiudadano = ?';
        db.query(query, [userId], function (error, results, fields) {
            if (error) {
                reject(boom.badRequest(error));
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { verifyEmail };
