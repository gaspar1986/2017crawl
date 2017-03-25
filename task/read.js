var request = require('request');//拉取网页内容
var cheerio = require('cheerio');//实现jquery功能
var iconv = require('iconv-lite');//把GBK转成utf8
exports.category = function (url,callback) {
    request({url:url,encoding:null},function (err,res,body) {
        if(err){
            return console.error(err);
        }
        body = iconv.decode(body,'gbk');
        var $ = cheerio.load(body);
        var items = [];
        $('.hd .title a').each(function () {
            var $me = $(this);
            var item = {
                name:$me.text().trim(),
                url:$me.attr('href')
            }
            var reg = /\?b=(\d+)/ig;
            var result = reg.exec(item.url)[1];
            item.id = result;
            items.push(item);
        })
        callback(null,items);

    });
}
exports.article = function (url,cid,callback) {
    console.log(cid);
    request({url:url,encoding:null},function (err,res,body) {
        if(err){
            return console.error(err);
        }
        body = iconv.decode(body,'gbk');
        var $ = cheerio.load(body);
        var items = [];
        $('.keyword a').each(function () {
            var $me = $(this);
            var item = {
                name:$me.text().trim(),
                url:$me.attr('href'),
                cid:cid
            }
            if(item.name !='search'){
                items.push(item);
            }
        })
        callback(null,items);
        console.log(items);
    });
}
