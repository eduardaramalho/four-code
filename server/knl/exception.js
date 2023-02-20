const apiErrors  = require('../consts/api-errors');

const createException = (apiErrorCode, aditionalInfo, condition, aditionalObject) => {
    const errorObject = createExceptionObject(apiErrorCode, aditionalInfo, condition, aditionalObject);

    if (!errorObject){
        return;
    }

    throw errorObject;
}

const createExceptionObject = (apiErrorCode, aditionalInfo, condition, aditionalObject) => {
    if (apiErrorCode == undefined || apiErrorCode == null){
        return;
    }

    if (condition != undefined && condition == false){
        return;
    }

    const error = apiErrors.getApiErrorCode(apiErrorCode);

    const errorObject = {
        ApiError         : apiErrorCode,
        ErrorDescription : '<Description for this api error code not found>',
        AditionalInfo    : '',
        AditionalObject  : {},
        HttpError        : 400,
    }

    if (error){
        errorObject.ErrorDescription = error.descError;
        errorObject.HttpError        = error.httpError;
    }

    if (aditionalInfo){
        errorObject.AditionalInfo = aditionalInfo;
    }

    if (aditionalObject){
        errorObject.AditionalObject = aditionalObject;
    }

    console.error('Exception: ApiError: ' + apiErrorCode + ' - ' + errorObject.ErrorDescription + ' - ' + errorObject.AditionalInfo);

    return errorObject;
}

exports.createException         = createException        ;
exports.createExceptionObject   = createExceptionObject  ;

