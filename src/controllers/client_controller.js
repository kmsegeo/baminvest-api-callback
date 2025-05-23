const response = require("../middlewares/response");
const Acteur = require("../models/Acteur");
const { Particulier } = require("../models/Client");
const Utils = require('../utils/utils.methods');
const OTP = require("../models/OTP");

const activeOnbording = async (req, res, next) => {
    
    console.log(`Onbording activation callback..`)

    // const ref = req.query.ref
    const {IdClient, NumeroCompteEspece, NumeroCompteTitre, Status, Email, Tel} = req.body
    
    Utils.expectedParameters({IdClient, NumeroCompteEspece, NumeroCompteTitre, Status}).then( async () => {

        console.log(`Activation du client :`, IdClient);
        console.log(`Reférence client :`, Email);
        console.log(`Compte titre :`, NumeroCompteTitre);

        await Acteur.findByEmail(Email).then(async acteur => {
            if (!acteur) return response(res, 404, `Acteur non trouvé !`);
            await Particulier.setAtsgoClientData(acteur.e_particulier, IdClient, NumeroCompteTitre, NumeroCompteEspece).then(async particulier => {
                if (!particulier) return response(res, 400, `Erreur à l'enregistrement du compte titre !`);

                await Utils.genearteOTP_Msgid().then(async msgid => {
                    console.log('Envoi de message:', msgid, '..');
                    await OTP.create(acteur.r_i, {msgid, code_otp:null, operation: 3}).then(async (sms_refs) => { // 3: notification
                        await fetch(process.env.ML_SMSCI_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                identify: process.env.ML_SMSCI_ID,
                                pwd: process.env.ML_SMSCI_PWD,
                                fromad: process.env.ML_SMSCI_CLT,
                                toad: acteur.r_telephone_prp,
                                msgid: msgid,
                                text: `Votre compte client: ${IdClient}, à été validé. \nN° compte titre: ${NumeroCompteTitre}, \nN° compte espèce: ${NumeroCompteEspece}.`
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data!=1) return response(res, 200, `Envoi de reponse echoué`, data);
                            return response(res, 200, `Reponse envoyé avec succès`);
                        }).catch(err => next(err));

                    }).catch(err => next(err));
                }).catch(err => next(err));

            }).catch(err => next(err));
        }).catch(err => next(err));

    }).catch(err => response(res, 400, err))

}

module.exports = {
    activeOnbording
}