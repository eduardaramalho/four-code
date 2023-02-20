const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Endereco', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        cep : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        rua : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        numero : {
            type : Sequelize.STRING,
            allowNull : false,
        },
        complemento : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        bairro : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        cidade : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        uf : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        fkCliente : {
            type : Sequelize.INTEGER(100),
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
}
