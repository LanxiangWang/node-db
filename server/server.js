// lodash is a comprehensive utility kit
var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });


  todo.save().then((doc) => {
    console.log(doc);
    res.send(doc);
  }, () => {
    res.send('Unable to save.');
  });
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'first_name', 'last_name']);
  var user = new Users(body);
  console.log('start post');
  user.save().then((user) => {
    // res.send(typeof user);
    console.log(typeof user);
    console.log('user.save()123');

    return user.generateAuthToken();
  }).then((token) => {
    console.log('user.save().then().then() and token is: ', token);
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
  console.log('end post');
});

app.get('/todos', (req, res) => {

  Todo.find().then((todos) => {
    res.send(todos);
  }, (err) => {
    res.send('Unable to connect to MongoDB.', err);
  });
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  // validate id using isValid
  if (!ObjectID.isValid(id)) {
    // 404 -send back empty send
    res.status(404).send('This is an incorrect id.');
  }
  
  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send('No todo with this id found');
    }

    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
  // query by findById
    // success
    // error - 400 send back nothing

});

app.delete('/todos/:id', (req, res) => {
  // get id
  var id = req.params.id;
  // validate id -> ?not return 404
  if (!ObjectID.isValid(id)) {
    res.status(404).send('Id format is incorrect.');
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((doc) => {
    if (!doc) {
      res.status(404).send('No matching todo with this id.');
    }
    res.send(doc);
  }, (err) => {
    res.status(400).send('Something wrong with MongoDB');
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // getTime() -> return javascript timestamp -> regular number
  if (_.isBoolean(body.completed) && body.completed) {
    console.log('********************');
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
});
  

  // res.send(Todo.find().then((res) => {
  //   res.send({
  //     res,
  //     text: 'good'
  //   });
  // }, (err) => {
  //   res.status(400).send(err);
  // }));
// });



app.get('/users/me', authenticate, (req, res) => {
  
  res.send(req.user);

});








app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};



























//***************** EXAMPLE **********************

// var newUser = new Users({
//   email: 'lanxiang.wang13@gmail.com',
//   firstName: 'Lanxiang',
//   lastName: 'Wang'
// });

// newUser.save().then((doc) => {
//   console.log('Success!', doc);
// }, (err) => {
//   console.log('Unable to save', err);
// })

// var newTodo = new Todo({
//   text: 'Go to school'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved successfully!', doc);
// }, (err) => {
//   console.log('Unable to save this record', err);
// });

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved!', doc);
// }, (e) => {
//   console.log('Unable to save');
// });



