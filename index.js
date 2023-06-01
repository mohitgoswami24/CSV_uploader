//importing packages
const express = require('express');
const port = 3000;
const app = express();

const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const db = require("./config/mongoose");

//using layouts
app.use(expressLayouts);

//to parse the body of the request
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

//to use static files
app.use(express.static('./assets'));    

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//using routes
app.use('/', require('./routes'));

//launching the server 
app.listen(port, function(err) {
    if(err) {
        console.log('Error', err);
        return;
    }
    console.log(`Server running on port: http://localhost:${port}`);

});