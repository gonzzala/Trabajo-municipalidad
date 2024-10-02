const express = require('express');
const ReportController = require('../controllers/report.controller');
const validatorLogin = require('../middlewares/validator.login');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();

router.get('/', ReportController.getAll)
router.get('/area/:userId', ReportController.getReportsByIdAdmin)
router.get('/:userId', ReportController.getReportsById)
router.post('/', ReportController.createReport);
router.put('/:id', ReportController.updateReport);
router.post('/searchReports', ReportController.searchReports);



module.exports = router;