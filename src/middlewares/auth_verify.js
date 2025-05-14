const response = require("./response");
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    try {
        console.log(`Authentification utilisateur..`);
        let decodedToken = null;
        
        try {

            const token = req.headers.authorization.split(' ')[1];
            decodedToken = jwt.verify(token, process.env.SESSION_KEY);

        } catch (error) {

            if (error.name=='TokenExpiredError') 
                throw "Token expiré !"

            if (error.name=='JsonWebTokenError') 
                throw "Token invalide !"

            throw error;
        } 
        
        console.log(`Vérification callback user..`)
        console.log('user:', decodedToken.username)
        next();
                
    } catch (error) {
        return response(res, 401, error);
    }
}
