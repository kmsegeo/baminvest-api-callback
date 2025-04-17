const response = require('../middlewares/response');
const Acteur = require('../models/Acteur');
const Utils = require('../utils/utils.methods');
const OTP = require("../models/OTP");

const activeMouvement = async (req, res, next) => {

    console.log(`Mouvement validation callback..`);

    const ref = req.query.ref
    const {idClient, idMouvement, status} = req.body

    console.log(`client ref:`, ref);

    Utils.expectedParameters({idClient, idMouvement}).then( async () => {
        
        console.log(`Validation du mouvement `, idMouvement);
        console.log(`Mouvement du client`, idClient);

        await Acteur.findByEmail(ref).then(async acteur => {
            if (!acteur) return response(res, 404, `Acteur non trouvé !`);

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
                            text: `Votre dépôt portant l'identifiant: ${idMouvement}, à bien été pris en compte.`
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

    }).catch(err => response(res, 400, err))
    
}

const activeOperation = async (req, res, next) => {
        
    console.log(`Operation validation callback..`);

    const ref = req.query.ref
    const {idClient, idOperationClient, status} = req.body

    console.log(`client ref:`, ref);

    Utils.expectedParameters({idClient, idOperationClient}).then( async () => {
        
        console.log(`Validation de l'operation `, idOperationClient);
        console.log(`Operation du client`, idClient);

        await Acteur.findByEmail(ref).then(async acteur => {
            if (!acteur) return response(res, 404, `Acteur non trouvé !`);
            
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
                            text: `Votre opération portant l'identifiant: ${idOperationClient}, à été traité avec succès.`
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

    }).catch(err => response(res, 400, err))

}

module.exports = {
    activeMouvement,
    activeOperation
}