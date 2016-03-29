'use strict';
const Cursor = require('pg-cursor');
const pg = require('./pg_mod');
const elasticsearch = require('elasticsearch');
const elastic = new elasticsearch.Client({
    host: process.env.ELASTIC_CONN || 'localhost:9200',
    log: 'error'
});

class elasticShuttle {
    constructor(index, type) {
        this.index = index;
        this.type = type;
    }

    next_cursor(cursor, callback) {
        cursor.read(1, function(err, rows) {
            if (err) {
                return callback(err);
            } else if (rows.length) {
                let row = rows[0];
                elastic.create({
                    index: this.index,
                    type: this.type,
                    id: row.id,
                    body: row
                }, function(err, response) {
                    if (error) {
                        if (error.status === 409) {
                            console.log('That document already exists');
                            return next_cursor(cursor, callback);
                        }
                        else {
                            console.log(error);
                        }
                    }
                });
                return next_cursor(cursor, callback);
            } else {
                return callback('All records have been shuttled.');
            }
        })
    }

    curse(query) {
        pg.connect(function(err, client, done) {
            if (err) console.log('PG Error: ' + err);
            let cursor = client.query(new Cursor(query));
            next_cursor(cursor, function(err) {
                console.log('Done: ' + err);
            });
        });
    }
}

export default class elasticShuttle;