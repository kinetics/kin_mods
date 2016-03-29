'use strict';
const pg = require('pg');
const user = process.env.PG_USER || 'postgres';
const host = process.env.PG_URL || 'localhost';
const port = process.env.PG_PORT || 5432;
const password = process.env.PG_PASS || 'password';
const db = process.env.PG_DBNAME || 'postgres';
const connection_string = 'postgres://' + user + ':' + password + '@' + host + ':' + port + '/' + db;

/**
 *
 * @param callback
 *      Returns the connection results (error, client object, and done object).
 *      Done Object should be used to end the connection after finished with CLient.
 */
exports.connect = function(callback) {
    // It's important to return the done callback here. We don't want to leave the connection open.
    pg.connect(connection_string, function(err, client, done) {
        if (err) {
            return callback(err);
        }
        return callback(null, client, done);
    });
};