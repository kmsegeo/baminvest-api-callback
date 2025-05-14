const response = require("../middlewares/response")
const Utils = require("../utils/utils.methods")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {

    const {username, password} = req.body

    Utils.expectedParameters({username, password}).then(async () => {

        if (username!='api.cbk.atsgo' || password!='sdcz6-s7gDe')
            return response(res, 401, `Login ou mot de passe incorrect !`);

        const delai = 24
        const expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + delai)

        return response(res, 200, 'Ouverture de session', {
            token: jwt.sign(
                {username},
                process.env.SESSION_KEY,
                { expiresIn: delai + 'h' }
            ),
            expire: expireDate,
            type: 'Bearer',
            refresh_token: jwt.sign(
                {username},
                process.env.SESSION_KEY,
                // { expiresIn: '365d' }
            ),
        });

    }).catch(err => response(res, 400, err));
}

module.exports = {
    userAuth
}