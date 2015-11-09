var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;


var BallotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  id: {
    type: Number,
    required: true
  },

  votesFor: {
    type: Number
  },

  votesAgainst: {
    type: Number
  }
});

BallotSchema.methods.comparePasswords = function (candidatePassword) {
  // var defer = Q.defer();
  // var savedPassword = this.password;
  // bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
  //   if (err) {
  //     defer.reject(err);
  //   } else {
  //     defer.resolve(isMatch);
  //   }
  // });
  // return defer.promise;
};

BallotSchema.pre('save', function (next) {
  // var user = this;

  // // only hash the password if it has been modified (or is new)
  // if (!user.isModified('password')) {
  //   return next();
  // }

  // // generate a salt
  // bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
  //   if (err) {
  //     return next(err);
  //   }

  //   // hash the password along with our new salt
  //   bcrypt.hash(user.password, salt, null, function (err, hash) {
  //     if (err) {
  //       return next(err);
  //     }

  //     // override the cleartext password with the hashed one
  //     user.password = hash;
  //     user.salt = salt;
  //     next();
  //   });
  // });
});

module.exports = mongoose.model('Ballot', BallotSchema);
