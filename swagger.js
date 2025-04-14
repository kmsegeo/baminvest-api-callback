const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'BAM API Callback',
        version: process.env.VERSION,
        description: `Api callback de l'application de fonds commun de placement de Bridge Asset Management`,
    },
    host: 'bam.mediasoftci.net/api/bamcallbk',
    schemes: ['https']
};

const outpoutFile = './swagger-outpout.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outpoutFile, endpointsFiles, doc).then(()=>{
    require('./app.js');
});