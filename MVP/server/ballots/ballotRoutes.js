var ballotController = require('./ballotController.js');


module.exports = function (app) {
  // // app === userRouter injected from middlware.js
  app.post('/', ballotController.addBallot);
  app.get('/', ballotController.getBallots);
  app.post('/vote', ballotController.vote);
};
