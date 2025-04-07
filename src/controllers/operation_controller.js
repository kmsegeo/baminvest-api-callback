const response = require('../middlewares/response');
const Utils = require('../utils/utils.methods');

const activeOperation = async (req, res, next) => {
        
    console.log(`Operation activation callback..`);

    const ref = req.query.ref
    const {idClient, idOperationClient} = req.body

    console.log(`client ref:`, ref)

    Utils.expectedParameters({idClient, idOperationClient}).then( async () => {
        
        
        console.log(`Activation de l'operation `, idOperationClient);
        console.log(`Operation du client`, idClient);

        return response(res, 200, `Reponse envoyé avec succès`);

    }).catch(err => response(res, 400, err))

}

module.exports = {
    activeOperation
}