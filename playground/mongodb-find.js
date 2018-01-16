// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


// No need to create a dabtabase called "TodoApp" first
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({_id: new ObjectID('5a5d0fa165b6b946ce2ab5e1')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos. Error Message: ', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos count:', count);
  // }, (err) => {
  //   console.log('Unable to fetch todos. Error Message: ', err);
  // });

  db.collection('Users').find({name: 'Lanxiang'}).count().then((res) => {
    console.log(`${res} result(s) found`);
    return db.collection('Users').find({name: 'Lanxiang'}).toArray();
  }).then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
  });

  // db.collection('Users').find({name: 'Lanxiang'}).toArray().then((res) => {
  //   var num = db.collection('Users').find({name: 'Lanxiang'}).count();
  //   console.log(`${num} results found`);
  // }, (err) => {
  //   console.log('Unable to connect to MongoDB');
  // });




  // db.close();
});