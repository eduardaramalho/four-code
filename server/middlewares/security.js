const knl = require('../knl');
const jwt = require('../utils/jwt');

knl.express.use(async(req, resp, next) => {
    let rawToken = req.headers['authorization'];

    if (!req.app){
        req.app = {};
    }

    req.app.public          = true;
    req.app.token           = undefined;
    req.app.securitySession = undefined;

    if (!rawToken){
        next();
        return;
    }

    const auth = rawToken.split(' ');
    if (auth.length != 2){
        resp.status(404);
        resp.json({error : 'Token invalid. Its necessary bearer + token'});
        return;
    }

    rawToken = auth[1];

    req.app.public = false;
    req.app.token  = rawToken;
    try{
        const user = await jwt.verify(rawToken);

        req.app.userid = user.userid;
        next();
    }catch(e){
        resp.json(knl.createExceptionObject('0004'));
        resp.status(401);
        resp.end();   
    }
})