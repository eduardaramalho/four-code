const uuid      = require('../utils/uuid');
const container = require('./container');
const validator = require('./validator');
const objects     = require('../utils/object-utils');
const exception   = require('./exception');

exports.express   = global.app.express;
exports.uuid      = uuid.gen;
exports.get       = container.get;
exports.post      = container.post;
exports.put       = container.put;
exports.delete    = container.delete;
exports.patch     = container.patch;
exports.objects   = objects;
exports.createException       = exception.createException;
exports.createExceptionObject = exception.createExceptionObject;
exports.validate              = validator.validate;
exports.sequelize             = () => {
    return global.app.context.getStore().sequelize;
};