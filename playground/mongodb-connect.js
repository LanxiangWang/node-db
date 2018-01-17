const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


// No need to create a dabtabase called "TodoApp" first
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // database -> collection -> document -> field
  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  // db.collection('Students').insert([{
  //   name: 'Lanxiang',
  //   age: 22,
  //   major: 'ECE'
  // }, {
  //   name: 'Sihan',
  //   age: 23,
  //   major: 'MIS'
  // }], (err, result) => {
  //   if (err) {
  //     return console.log('Unable to connect to MongoDB server.');
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // })








  db.close();
});