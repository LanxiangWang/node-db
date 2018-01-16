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

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Finish 18600 assignment'}).then((result) => {
  //   console.log(result);
  // })

  // deleteOne
  // db.collection('Users').deleteOne({name: 'Lanxiang'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
 





  // db.close();
});