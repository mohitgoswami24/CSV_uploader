// Importing packages and model
const fs = require('fs');
const csvParser = require('csv-parser');
const CSV = require('../models/csv');
const path = require('path');

// To upload the File 
module.exports.upload = async function(req, res) {
    try {

        // If file is not present
        if(!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        // If it a CSV file
        if(req.file.mimetype == 'application/vnd.ms-excel' || req.file.mimetype == "text/csv") {
            
           let file = await CSV.create({
                fileName: req.file.originalname,
                filePath: req.file.path,
                file: req.file.filename
            });

        // If it is not a CSV file
        }else{

            return res.status(400).send('Select CSV files only.');

        }
        
        return res.redirect('/');

    } catch (error) {
        console.log('Error in fileController/upload', error);
        res.status(500).send('Internal server error');
    }
}

// To view the files present in the Database
module.exports.view = async function(req, res) {
    try {
         
        let csvFile = await CSV.findOne({file: req.params.id});
         
        const results = [];
        const header =[];

        fs.createReadStream(csvFile.filePath)  
        .pipe(csvParser())
        .on('headers', (headers) => {

            headers.map((head) => {
                header.push(head);
            });
             
        })
        .on('data', (data) => results.push(data))
        .on('end', () => {
             
            res.render("file_viewer", {
                title: "File Viewer",
                fileName: csvFile.fileName,
                head: header,
                data: results,
                length: results.length
            });

        });


    } catch(err) {
        console.log('Error in fileController/view', err);
        res.status(500).send('Internal server error');
    }
}

// To delete the file from the Database
module.exports.delete = async function(req, res) {
    try {
        // console.log(req.params);
        let isFile = await CSV.findOne({file: req.params.id});

        if(isFile){

            fs.unlinkSync(isFile.filePath);

            await CSV.deleteOne({file: req.params.id});   

            return res.redirect("/");
        }else{
            console.log("File not found");
            return res.redirect("/");
        }
    } catch (error) {
        console.log('Error in fileController/delete', error);
        return;
    }
}