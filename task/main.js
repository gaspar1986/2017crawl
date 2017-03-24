var read = require('./read');
var save = require('./save');
var async = require('async');
var url = 'http://top.baidu.com/category?c=10&fr=topindex';
var categories = [];
var articles = [];
async([
    function (done) {
        read.category(url,function (err,list) {
            categories = list;
            done();
        });
    },
    function (done) {
        save.category(categories,done);
    },
    function (done) {
        async.forEach(categories,function (catetory,next) {
            read.article('http://top.baidu.com/buzz?b='+catetory.id+'&c=10&fr=topcategory_c10',function (err,list) {
                articles = articles.concat(list);
                next();
            });
        }, done)
    },
    function (done) {
        save.article(articles,done);
    }
],function (err,result) {
    console.log('所有任务完成了');
})
