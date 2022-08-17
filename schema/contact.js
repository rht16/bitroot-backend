const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true
  },
  modifiedOn: {
    type: Date,
    required: true
  },
  image: {
    type: String,
  }
});

const Contact = mongoose.model('Contact', schema);

module.exports = Contact;
