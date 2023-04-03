const isNullOrUndefined = (obj) => {
    if (obj == null || obj == undefined){
        return true;
    }

    return false;
}

const isArray = (param) => {
    if (isNullOrUndefined(param)){
        return false;
    }

    return Array.isArray(param);
}

const isEmptyArray = (param) => {
    if (!isArray(param)){
        return true;
    }

    return param.length == 0;
}

const copy = (obj) => {
    if (isNullOrUndefined(obj)){
        return null;
    }

    return JSON.parse(JSON.stringify(obj));
}

const sum = (array, field) => {
    if (isEmptyArray(array)){
        return 0;
    }

    let result = 0;

    for (const element of array){
        if (!element[field]){
            continue;
        }

        result = result + element[field] * 1;
    }

    return result;
}

exports.isNullOrUndefined = isNullOrUndefined;
exports.isArray           = isArray;
exports.isEmptyArray      = isEmptyArray;
exports.copy              = copy;
exports.sum               = sum;