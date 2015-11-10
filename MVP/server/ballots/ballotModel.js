var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

var ObjectId = mongoose.Types.ObjectId;

var BallotSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },

  opt1: {
    type: String,
    required: true,
    unique: true
  },

  opt2: {
    type: String,
    required: true,
    unique: true
  },

  info: {
    type: String
  },

  opt1Votes : {
    type: Number,
    required:true
  },

  opt2Votes : {
    type: Number,
    required:true
  }
});


module.exports = mongoose.model('ballots', BallotSchema);
