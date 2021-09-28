var mysql = require('mysql');

const JAWS_DB_HOST = process.env.JAWS_DB_HOST || 'c8u4r7fp8i8qaniw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com';
const JAWS_DB_USERNAME = process.env.JAWS_DB_USERNAME || 'xh3asb11d6uncr21';
const JAWS_DB_PASSWORD = process.env.JAWS_DB_PASSWORD || 'xv6fzh4knbamm49y';
const JAWS_DB_DATABASE = process.env.JAWS_DB_DATABASE || 'xifj81f2bnqon48s';

var pool  = mysql.createPool({
    connectionLimit : 10,
    host: JAWS_DB_HOST,
    user: JAWS_DB_USERNAME,
    password: JAWS_DB_PASSWORD,
    database: JAWS_DB_DATABASE
});

exports.sendQuery = (queryString, callback) => {
    let results = pool.query(queryString, (error, results, fields)=>{
        if (error){
            console.log('error', error);
            return callback(null);
        }
        return callback(results)
    })
    return results;
}
exports.pool = pool;