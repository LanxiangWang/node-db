// const {SHA256} = require('crypto-js');

// var message = 'I am Lanxiang Wang';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
// console.log(hash.length);

// var data = {
//   id: 4
// };

// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var res_hash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (res_hash === token.hash) {
//   console.log('Safe');
// }
// else {
//   console.log('Dangerous');
// }

// const jwt = require('jsonwebtoken');

// // jwt.sign
// // jwt.verify

// var data = {
//   id: 10
// };

// var token = jwt.sign(data, '123');
// console.log(token);

// var decoded = jwt.verify(token, '123');
// console.log(decoded);

const bcrypt = require('bcryptjs');

var password = '123abc';


bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$DWF3BY3kHurpeW9kGWQ12u2Sd2eOCDgwIBOtUzwJ.TKnKNRMt5Gtm';

bcrypt.compare('123abc', hashedPassword, (err, res) => {
  console.log(res);
})












