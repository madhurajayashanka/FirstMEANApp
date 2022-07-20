
const path =require('path');
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')


const app = express();
const MONGOUSERNAME=process.env.MONGO_ATLAS_USERNAME;
const MONGOPASSWORD=process.env.MONGO_ATLAS_PW;

mongoose.connect('mongodb+srv://'+MONGOUSERNAME+':'+MONGOPASSWORD+'@cluster0.9ykke.mongodb.net/?retryWrites=true&w=majority').
then(()=>{
  console.log('Connected to database!');
}).catch(()=>{
  console.log('connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("images")));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH,PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With,content-type, Accept');
res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
