const sequelizeUtils = require('../utils/sequelize-utils');

const updateDB = async () => {
    const sequelize = await sequelizeUtils();

    sequelize.sync({ alter: true });
}

updateDB();