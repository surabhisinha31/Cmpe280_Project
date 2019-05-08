var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://ranjithcheguri:lallu1994@ds237979.mlab.com:37979/homeaway');

module.exports = {mongoose};
