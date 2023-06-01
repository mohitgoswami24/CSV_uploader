//importing mongoose package
const mongoose = require("mongoose");

//connecting to Database
mongoose.connect('mongodb://127.0.0.1:27017/CSV_FILE_DATA');

//setting it to db
const db = mongoose.connection;

//if error
db.on("error", console.error.bind(console, "Error connecting to DB"));

//when db connects successfully
db.once("open", function(){
    console.log("Connected to Database :: mongoDB");
});
