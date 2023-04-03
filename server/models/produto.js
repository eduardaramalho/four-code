const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Produto', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        descricao : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        precoVenda : {
            type : Sequelize.DECIMAL(10, 2),
            allowNull : false
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        fkgrupo : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        fksubGrupo : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        fkColecao : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
}