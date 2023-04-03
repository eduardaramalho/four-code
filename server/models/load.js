const fs   = require('fs');
const path = require('path')

const loadModels = (sequelize) => {
    const files = fs.readdirSync(__dirname);

    files.forEach(file => {
        if (path.extname(file) != '.js'){
            return;
        }
        
        if (file != 'load.js'){
            require(__dirname + '/' + file)(sequelize);
        }
    })
}

module.exports = (sequelize)=> {
    loadModels(sequelize);
}