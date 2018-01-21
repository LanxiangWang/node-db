const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  }, 

  first_name: {
    type: String,
    required: true,
    minlength: 1,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]

}, {usePushEach: true});

// instance method
// error function doesn't combine 'this' keyword
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{
    access,
    token
  }]);

  console.log('user created with tokens');

  return user.save().then(() => {
    console.log('save toekn!', token);
    return token;
  }).catch((e) => {
    console.log('save failed', e);
  })
  // return user.save().then(() => {
  //   return token;
  // })
}

// overwrite function
UserSchema.methods.toJSON = function() {
  var user = this;
  // toObject() only converts property to object
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

var Users = mongoose.model('Users', UserSchema);

module.exports = {
  Users
};