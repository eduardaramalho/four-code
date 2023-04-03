const knl = require('../knl');

knl.express.use(async (req, resp, next) => {
    if (req.app.public){
        next();
        return;
    }

    req.app.sequelize.transaction(async t => {
        const result = await req.app.sequelize.models.Usuario.findAll({
            where : {
                id : req.app.userid
            }
        });

        if (knl.objects.isEmptyArray(result)){
            resp.json(knl.createExceptionObject('0004'));
            resp.status(401);
            resp.end();
            return;
        }
    
        req.app.session = knl.objects.copy(result[0]);
        delete req.app.session.password;
        next();
    });
});