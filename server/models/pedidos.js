const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Pedidos', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        fkcliente : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        dataEmissao : {
            type : Sequelize.DATE,
            allowNull : false
        },
        dataEntrega : {
            type : Sequelize.DATE,
            allowNull : false
        },
        fkendereco : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        total : {
            type : Sequelize.DECIMAL(10, 2),
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
}