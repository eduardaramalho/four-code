const { v4: uuidv4 } = require('uuid');

exports.gen = () => {
    return uuidv4().replace(/\-/g,'').toUpperCase();
}