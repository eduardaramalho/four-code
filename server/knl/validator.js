const expt   = require('./exception');

const generateAdditionalInfo = (value) => {
    if (!value.error){
        return '';
    }

    if (!value.error.details){
        return '';
    }

    let msg = '';

    value.error.details.forEach(element => msg = msg + element.message);

    return msg;
}

const validate = (obj, schema) => {
    const value = schema.validate(obj);
    
    const aditionalInfo = generateAdditionalInfo(value);

    if (value.error){
        console.log('Error on validate schema: ' + value.error);
        expt.createException('0005', aditionalInfo);
    }
};

module.exports.validate = validate;