require("dotenv").config();
const connect = require("./db");
const express = require("express");
const shortid = require('shortid');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors({credentials : true, origin: true}))
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 8080;
const Contact_controller = require('./controllers/Contacts')

app.use('/', Contact_controller);

app.listen(PORT, async () => {
    console.log("starting");
    await connect();
    console.log("listening to port", PORT);
})