var myPromise = new Promise((resolve, reject) => {
  setTimeout(resolve('hello'), 1000);
});

var testPromise = myPromise.then(() => {
  return 'I am the return data';
});

console.log(testPromise);

testPromise.then((data) => {
  console.log(data);
});

const {mongoose} = require('./../server/db/mongoose');
const {Users} = require('./../server/models/user');


var user = new Users({
  email: 'example@example.com',
  first_name: 'Example',
  last_name: 'Wang',
  password: '123456'
});

console.log(typeof user);