'use strict';
var express = require('express');

// // CORS ENABLED
// express.use('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()
//   });

var routes = function(db) {
  var categoryRouter = express.Router();
  categoryRouter.route('/')
    .get(function(req, res) {
      db.find({}).sort({ name: 1 }).exec(function(err, categories) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(categories);
        }
      });
    });
  return categoryRouter;
};

module.exports = routes;
