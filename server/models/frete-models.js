const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Endereco', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        ValorTotal : {
            type : Sequelize.DECIMAL(10, 2),
            allowNull : false,
        },
        ativo : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        desconto : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
}
