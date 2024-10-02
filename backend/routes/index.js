const express = require('express');

const loginRouter = require('./login.router');
const registerRouter = require('./register.router');
const verificationRouter = require('./verification.router');
const reportsRouter = require('./reports.router');
const areasRouter = require('./areas.router');
const estadosRouter = require('./estados.router');
const usersRouter = require('./users.router');
const plazoVtoRouter = require('./plazoVto.router');
const adminRouter = require('./admin.router');
const partidosRouter = require('./partidos.router');
const recoveryRouter =require('./recovery.router')

function routes(app) {
const router = express.Router();
 app.use('/api', router);
 router.use('/login', loginRouter);
 router.use('/register', registerRouter);
 router.use('/verify', verificationRouter); 
 router.use('/recovery', recoveryRouter); 
 router.use('/reports', reportsRouter);
 router.use('/areas', areasRouter);
 router.use('/estados', estadosRouter);
 router.use('/ciudadanos', usersRouter);
 router.use('/plazo', plazoVtoRouter);
 router.use('/admin', adminRouter);
 router.use('/partidos', partidosRouter);

 }

module.exports = routes;