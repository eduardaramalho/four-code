const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Subgrupo', {
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
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        fkgrupo : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
}