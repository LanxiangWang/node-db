var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp').then(() => {
  console.log('Connected to MongoDB successfully!');
}, (err) => {
  console.log('Unable to connect to MongoDB.');
});

module.exports = {
  mongoose
}
