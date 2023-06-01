//importing csv model
const CSV = require("../models/csv");

//to render the home page with the files in the Database
module.exports.home = async function(req, res) {
    try {
        let file = await CSV.find({});

        return res.render('home', {
            files: file,
            title: "Home"
        });

    } catch(err) {
        console.log('Error in homeController/home', err);
        return;
    }
};