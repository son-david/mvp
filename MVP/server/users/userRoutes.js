var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js
  app.get('/', function(req,res){
    res.send('yes');
  });
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
};
