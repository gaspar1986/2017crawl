var read = require('./read');
var save = require('./save');
var async = require('async');
var url = 'http://top.baidu.com/category?c=10&fr=topindex';
var categories = [];
var articles = [];
async.series([
    function (done) {
        read.category(url,function (err,list) {
            categories = list;
            console.log(categories);
            done();
        });
    },
    function (done) {
        save.category(categories,done);
    },
    function (done) {
        async.forEach(categories,function (catetory,next) {
            read.article('http://top.baidu.com/buzz?b='+catetory.id+'&c=10&fr=topcategory_c10',catetory.id,function (err,list) {
                articles = articles.concat(list);
                next();
            });
        }, done)
    },
    function (done) {
        save.article(articles,done);
    }
],function (err) {
    if (err){
        console.log(err);
    }else {
        console.log('所有任务完成了');
    }
})
