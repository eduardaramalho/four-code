const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Cliente', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        nomeFantasia : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        razaoSocial : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        CNPJ : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        clienteDesde : {
            type : Sequelize.DATE,
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
    })
}
