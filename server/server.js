var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/user');


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
    // success 
      // if no doc, send 404

    // error -> 400 with empty body


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



