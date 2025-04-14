const express = require('express');
const clientController = require('../controllers/client_controller');
const operationController = require('../controllers/operation_controller');

const router = express.Router();

router.post('/onbording/callback', clientController.activeOnbording);
router.post('/operations/callback', operationController.activeOperation);

module.exports = router;