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
    // { name: 'sd', opt1: 'd', opt2: 'd' }
    var name = req.body.name;
    var opt1 = req.body.opt1;
    var opt2 = req.body.opt2;

    //var info = req.body.info;

    var findBallot = Q.nbind(Ballot.findOne, Ballot);

    findBallot({name: name})
      .then(function(match){
        if (match){
          res.send(match);
        } else {
          var createBallot = Q.nbind(Ballot.create, Ballot);
          var newBallot = {
            name : name,
            opt1 : opt1,
            opt2 : opt2,
            opt1Votes : 0,
            opt2Votes : 0
          }
          return createBallot(newBallot);
        }
      })
      .then(function(created){
        if (created) {
          res.json(created);
        }  
      })
      .fail (function (error) {
        next(error);
      });
  },
  vote : function(req, res, next){
    var opt = req.body.opt;
    var ballotId = req.body.id;

    var findBallot = Q.nbind(Ballot.findOne, Ballot);

    findBallot({_id: ballotId})
      .then(function(match){
        if (match){
          if (opt === 1) {
            match.opt1Votes++;
          } else if (opt === 2) {
            match.opt2Votes++;
          }
          match.save();
          res.send(200);
          next();
        }
      })
      .fail (function (error) {
        next(error);
      });
  }
};







