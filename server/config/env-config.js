if (!process.env.environment){
    process.env.environment = 'development';
}

if (process.env.environment == 'production'){
    require('./env-production');
}

if (process.env.environment == 'development'){
    require('./env-development');
}