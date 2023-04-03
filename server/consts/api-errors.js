const errors = [];

addError = (code, desc, http) => {
    const obj = {
        codeError : code,
        descError : desc,
        httpError : 400
    };

    if (http){
        obj.httpError = http;
    }

    errors.push(obj);
}

getApiErrorCode = (error) =>{
    if (!error){
        return;
    }

    return errors.find(element => element.codeError == error);
}

addError('0003', 'JSON with invalid fields / without required fields / with invalid values');
addError('0004', 'Invalid token', 403);
addError('0005', 'Logon denied', 401);
addError('0006', 'User already exists');
addError('0007', 'Password are not equals');
addError('0008', 'Request needs a token');
addError('0009', 'Group already exists');
addError('0010', 'Subgroup already exists');


exports.getApiErrorCode = getApiErrorCode;