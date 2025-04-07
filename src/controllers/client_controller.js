const response = require("../middlewares/response");
const Utils = require('../utils/utils.methods');

const activeOnbording = async (req, res, next) => {
    
    console.log(`Onbording activation callback..`)

    const ref = req.query.ref
    const {idClient, numeroCompteTitre} = req.body

    console.log(`client ref:`, ref);
    
    Utils.expectedParameters({idClient, numeroCompteTitre}).then( async () => {

        console.log(`Activation du client`, idClient);
        console.log(`Compte titre :`, numeroCompteTitre);
    
        return response(res, 200, `Reponse envoyé avec succès`)

    }).catch(err => response(res, 400, err))

}

module.exports = {
    activeOnbording
}