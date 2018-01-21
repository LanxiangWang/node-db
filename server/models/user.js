const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
  // instance method use 'this' to indicate individula document
  var user = this;
  // toObject() only converts property to object
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

// model function
UserSchema.statics.findByToken = function (token) {
  // model method uses 'this' to indicate the whole model
  var Users = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e) {
    return Promise.reject();
    // or
    // return Promise.reject();
  }

  return Users.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
};

UserSchema.pre('save', function (next) {
  var user = this;
  console.log('pre save', user);

  // isModified always return true for new instance that hasn't been saved
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } 
  else {
    next();
  }
});

var Users = mongoose.model('Users', UserSchema);

module.exports = {
  Users
};