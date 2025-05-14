const express = require('express');
const clientController = require('../controllers/client_controller');
const operationController = require('../controllers/operation_controller');
const auth_verify = require('../middlewares/auth_verify');

const router = express.Router();

router.post('/onbording/callback', auth_verify, clientController.activeOnbording);
router.post('/mouvements/callback', auth_verify, operationController.activeMouvement);
router.post('/operations/callback', auth_verify, operationController.activeOperation);

module.exports = router;