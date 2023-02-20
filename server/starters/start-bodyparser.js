const bodyParser = require('body-parser');

global.app.express.use(bodyParser.json({ extended: true, limit: '50mb' }));
global.app.express.use(bodyParser.urlencoded({limit: '50mb', extended: true}));