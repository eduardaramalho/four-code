const knl      = require('./');
const namedSQL = require('yesql').pg

module.exports = (connection) => {
    if (!connection){
        return null;
    }

    let transaction = false;

    return {
        close : async () => {
            await connection.end();
        },
    
        startTransaction : async () => {
            await connection.beginTransaction();
            transaction = true;
        },

        commitTransaction : async () => {
            await connection.commit();
            transaction = false;
        },

        rollbackTransaction : async () => {
            await connection.rollback();
            transaction = false;
        },

        isInTransaction : () => {
            return transaction;
        },

        query : (sql, params) => {
            return new Promise((resolve, reject) => {
                if (knl.objects.isNullOrUndefined(params)){
                    params = {};
                }

                connection.query(namedSQL(sql)(params), (error, result) => {
                    if (error){
                        console.log(error);
                        reject(error);
                        return;
                    }
        
                    resolve(result.rows);
                })
            })
        }
    }    
};