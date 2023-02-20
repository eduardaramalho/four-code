const md5 = require('md5');
const securityConsts = require('../consts/security-consts');


module.exports = (password) => {
    return md5(securityConsts.PASSWORD_SALT + password + securityConsts.PASSWORD_SALT);
}