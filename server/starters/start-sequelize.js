
const knl            = require('../knl');
const sequelizeUtils = require('../utils/sequelize-utils');

knl.express.use(async (req, resp, next) => {
    const sequelize = await sequelizeUtils();

    if (!req.app){
        req.app = {};
    }

    req.app.sequelize = sequelize;
    next();
});