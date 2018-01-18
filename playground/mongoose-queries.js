const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
// const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');


// ***************** example ***************

// var id = '5a60baa468dd04324be92bfc11';

// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todos', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => {
//   console.log(e);
// })

// ******************* challange **************

Users.find({
  lastName: 'Wang'
}).then((doc) => {
  console.log(doc);
});

var id = '5a5e9496b7e6ff0f34fe8e63';

Users.findById(id).then((doc) => {
  if (!doc) {
    return console.log('Unable to find user');
  }
  console.log('User found: ', doc);
}, () => {
  console.log('Id is wrong.'); 
});
