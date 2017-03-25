var express = require('express');
var router = express.Router();
var async = require('async');
var model = require('../model');
/* GET home page. */
router.get('/', function(req, res, next) {
  async.parallel([
    function (cb) {
        model.category(cb)
    },
    function (cb) {
        model.article(cb)
    }  
  ],function (err,result) {
      res.render('index', {
          title: 'Express' ,
          categories:result[0],
          articles:result[1]
      });
  })

});

module.exports = router;
