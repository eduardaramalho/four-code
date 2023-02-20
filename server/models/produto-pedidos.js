const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Produtos_pedidos', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        fkpedido : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        fkproduto : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        quantidade : {
            type : Sequelize.DECIMAL(10, 2),
            allowNull : false,
        },
        valorUnitario : {
            type : Sequelize.DECIMAL(10, 2),
            allowNull : false,
        },
        desconto : {
            type : Sequelize.DECIMAL(10, 2),
            allowNull : false,
        },
        acrescimo : {
            type : Sequelize.DECIMAL(10, 2),
            allowNull : false,
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