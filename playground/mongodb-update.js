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

  // findOneAndUpdate
  db.collection('Todos').findOneAndUpdate(
    {text: 'Walk the dog'}, {
      $set: {
        completed: true
      }
    }, {
      returnOriginal: false
    }).then((res) => {
      console.log(res);
    })
 





  // db.close();
});