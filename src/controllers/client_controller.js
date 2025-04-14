const response = require("../middlewares/response");
const Acteur = require("../models/Acteur");
const { Particulier } = require("../models/Client");
const Utils = require('../utils/utils.methods');

const activeOnbording = async (req, res, next) => {
    
    console.log(`Onbording activation callback..`)

    const ref = req.query.ref
    const {idClient, numeroCompteEspece, numeroCompteTitre, status} = req.body
    
    Utils.expectedParameters({idClient, numeroCompteEspece, numeroCompteTitre}).then( async () => {

        console.log(`Activation du client :`, idClient);
        console.log(`Reférence client :`, ref);
        console.log(`Compte titre :`, numeroCompteTitre);

        await Acteur.findByEmail(ref).then(async acteur => {
            if (!acteur) return response(res, 404, `Acteur non trouvé !`);
            await Particulier.updateCompteTitre(acteur.e_particulier, numeroCompteTitre).then(async particulier => {
                if (!particulier) return response(res, 400, `Erreur à l'enregistrement du compte titre !`);
                return response(res, 200, `Reponse envoyé avec succès`)
            }).catch(err => next(err));
        }).catch(err => next(err));

    }).catch(err => response(res, 400, err))

}

module.exports = {
    activeOnbording
}