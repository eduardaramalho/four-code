const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('frete', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        status:{
            type:Sequelize.INTEGER.UNSIGNED,
            allowNull:false
        },
        ValorTotal:{
            type : Sequelize.DECIMAL(10, 2),
            allowNull : false,
        },
        desconto:{
            type:Sequelize.INTEGER.UNSIGNED,
            allowNull:false
        },
        ativo:{
            type: Sequelize.STRING(200),
            allowNull: false
        }
    })
}