const errorhandling = require('./src/middlewares/error_handler');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger-outpout.json');

const authRoutes = require('./src/routes/auth_routes');
const acteurRoutes = require('./src/routes/acteur_routes');

const app = express(); 

app.use(cors()); 
app.use(express.json()); 

// Routes

const base_path = '/v1'; 

app.use(base_path + '/auth', authRoutes)
app.use(base_path + '/acteurs', acteurRoutes); 

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument)); 
app.use(base_path + '/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument)); 

// Error handling middlware 

app.use(errorhandling); 

module.exports = app; 