var mysql = require('mysql');
var async = require('async');
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'crawl'
});
//把分类的列表保存的数据库中
exports.category = function (list,callback) {
    async.forEach(list,function (item,cb) {
        pool.query('insert into category values(?,?,?)',[item.id,item.name,item.url],cb)
    },callback)
}
//把文章的列表保存到数据库中
exports.article = function (list,callback) {
    async.forEach(list,function (item,cb) {
        pool.query('insert into article values(?,?,?)',[item.name,item.url,item.cid],cb)
    },callback)
}
