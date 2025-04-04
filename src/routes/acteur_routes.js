const express = require('express');
const clientController = require('../controllers/client_controller');
const operationController = require('../controllers/operation_controller');

const router = express.Router();

router.put('/onbording/calback', clientController.activeOnbording);
router.put('/operations/calback', operationController.activeOperation);

module.exports = router;