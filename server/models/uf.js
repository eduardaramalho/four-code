const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('UF', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        uf : {
            type : Sequelize.STRING(2),
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
}
