const jwt = require('jsonwebtoken');
const securityConsts = require('../consts/security-consts');

module.exports.sign = (userid) => {
    return jwt.sign({userid : userid}, securityConsts.JWT_KEY, {expiresIn : 43200});
}

module.exports.verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, securityConsts.JWT_KEY, (err, decode) => {
            if (err){
                reject(err);
                return;
            }

            resolve(decode);
        })
    })
}