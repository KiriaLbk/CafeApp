const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/db");
const account = require("./routes/account");
const passport = require('passport');
const dateparse = require('./datefrompage/datemenu');

// подключение в бд
mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
// обработчик успеха или нет подключения к бд
mongoose.connection.on("connected",()=>{
    console.log("bd works");
});
mongoose.connection.on("error",(err)=>{
    console.log(err);
});

const app = express();

const port = 3000;

// создание статической папки, в которой хранятся статические файлы
app.use(express.static(path.join(__dirname,'public')))
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
require('./config/passport')(passport);

app.use('/',account);

app.get("/",(req,res)=>{
    res.send("Hi!");
});

app.listen(port,()=>{
    console.log("server works");
})