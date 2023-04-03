const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

const handleException = (e, req, resp) => {
    console.error(e);
    
    const errorObject = {
        ApiError         : '9999',
        ErrorDescription : '<Description for this api error code not found>',
        AditionalInfo    : '',
        AditionalObject  : {},
        HttpError        : 400
    }

    if (e.HttpError){
        errorObject.HttpError = e.HttpError,
        resp.status(e.HttpError);
    } else {
        resp.status(400);
    }

    if (e.ApiError){
        errorObject.ApiError = e.ApiError;
    }

    if (e.ErrorDescription){
        errorObject.ErrorDescription = e.ErrorDescription;
    }

    if (e.AditionalInfo){
        errorObject.AditionalInfo = e.AditionalInfo;
    }

    if (e.AditionalObject){
        errorObject.AditionalObject = e.AditionalObject;
    }

    resp.send(errorObject);
}

const runInContext = async (req, resp, fn, userTypes) => {
    let connection  = null;
    let transaction = null;

    try{
        if (userTypes == undefined || userTypes == null){
            userTypes = [securityConsts.USER_TYPE_PRIVATE]
        }

        if (!Array.isArray(userTypes)){
            userTypes = [userTypes];
        }

        const publicUser = userTypes.find(element => element == securityConsts.USER_TYPE_PUBLIC);

        if (publicUser != 0){
            knl.createException('0008', '', !req.app.token || req.app.token == '');
        }

        connection  = global.app.context.getStore()?.sequelize; 
        transaction = await connection.transaction();

        await fn(req, resp);
        
        await transaction.commit();
    }catch(e){
        if (transaction){
            await transaction.rollback();
        }
        handleException(e, req, resp);
    } finally{
        if (connection){
            connection.close();
        }
    };
};

const container = (req, resp, fn, userTypes) => {
    global.app.context.run({
        req       : req,
        resp      : resp,
        sequelize : req.app.sequelize,
        name      : knl.uuid()
    }, async () => {
        await runInContext(req, resp, fn, userTypes);
    })
};

const route = (path) => {
    if (!path || path == '' || typeof path != 'string'){
        throw 'Invalid path';
    }

    if (path[0] != '/'){
        path = '/' + path;
    }

    return path;
}

exports.get = (path, fn, userTypes) => {
    path = route(path);
    console.log('Register route: GET:' + path);

    knl.express.get(path, (req, resp) => {
        container(req, resp, fn, userTypes);
    })
}

exports.post = (path, fn, userTypes) => {
    path = route(path);
    console.log('Register route: POST:' + path);

    knl.express.post(path, (req, resp) => {
        container(req, resp, fn, userTypes);
    })
}

exports.put = (path, fn, userTypes) => {
    path = route(path);
    console.log('Register route: PUT:' + path);

    knl.express.put(path, (req, resp) => {
        container(req, resp, fn, userTypes);
    })
}

exports.delete = (path, fn, userTypes) => {
    path = route(path);
    console.log('Register route: DELETE:' + path);

    knl.express.delete(path, (req, resp) => {
        container(req, resp, fn, userTypes);
    })
}

exports.patch = (path, fn, userTypes) => {
    path = route(path);
    console.log('Register route: PATCH:' + path);

    knl.express.patch(path, (req, resp) => {
        container(req, resp, fn, userTypes);
    })
}