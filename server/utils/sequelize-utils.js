const { Sequelize } = require("sequelize");

module.exports = async () => {
    const seq = new Sequelize({
        dialect  : 'mysql',
        host     : process.env.DB_SERVER,
        username : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE
    });

    await seq.authenticate();
    require('../models/load')(seq);
    
    return seq;
}