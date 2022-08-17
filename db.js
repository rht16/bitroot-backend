const mongoose = require("mongoose");
require('dotenv').config()
module.exports = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rdgpk.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`
    );
    console.log('connected to db')
  } catch (err) {
    console.log(err);
  }
};