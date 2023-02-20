require('./config/env-config');
require('./starters/start-async-storange');
require('./starters/start-express');
require('./starters/start-bodyparser');
// Sempre iniciar o sequelize depois do express
require('./starters/start-sequelize');
require('./starters/start-middlewares');
require('./starters/start-sync-db');
require('./routes');""

let port = 3003;

if (process.env.PORT){
    port = process.env.PORT;
}

global.app.express_listener_instance = global.app.express.listen(port, () => {
    console.log('Express is listen on ' + global.app.express_listener_instance.address().port)
});
