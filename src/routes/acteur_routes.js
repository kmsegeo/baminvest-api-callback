const express = require('express');
const clientController = require('../controllers/client_controller');
const operationController = require('../controllers/operation_controller');

const router = express.Router();

router.put('/onbording/callback', clientController.activeOnbording);
router.put('/operations/callback', operationController.activeOperation);

module.exports = router;