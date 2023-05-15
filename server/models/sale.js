const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Sale', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        meses : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        porcentagem : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        ativo : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
    })
}
