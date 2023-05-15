const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Frete', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        valor: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        valorTotal: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        desconto: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
        fkProduto: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
        ativo : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
    })
}