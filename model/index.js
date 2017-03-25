var mysql = require('mysql');
var async = require('async');
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'crawl'
});
exports.category = function (callback) {
    pool.query('select * from category',function (err,rows) {
        callback(err,rows);
    });
}
exports.article = function (callback) {
    pool.query('select * from article limit 10',function (err,rows) {
        callback(err,rows);
    });
}