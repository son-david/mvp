var Ballot = require('./ballotModel.js');
    Q = require('q');
    jwt = require('jwt-simple');

module.exports = {
//serverside functions
  getBallots : function(req, res, next) {
    var findAll = Q.nbind(Ballot.find, Ballot);

    findAll({})
      .then(function(ballots){
        res.json(ballots);
      })
      .fail(function (error){
        next(error);
      });
  },
  addBallot : function(req, res, next){
    var name = req.body.name;
    var opt1 = req.body.opt1;
    var opt2 = req.body.opt2;

    //var info = req.body.info;

    var createBallot = Q.nbind(Ballot.create, Ballot);
    var findBallot = Q.nbind(Ballot.findOne, Ballot);

    findBallot({name: name})
      .then(function (match){
        if (match) {
          res.send(match);
        } else {
          return;
        }
      })
      .then(function (title){
        if (title) {
          var newBallot = {
            name : name,
            opt1 : opt1,
            opt2 : opt2
          };
          return createBallot(newBallot);
        }
      })
      .then (function (createdBallot) {
        if(createdBallot) {
          res.json(createdBallot);
        }
      })
      .fail(function(error){
        next(error);
      })
  }
};