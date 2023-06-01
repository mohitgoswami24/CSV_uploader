//importing packages
const express = require('express');
const router = express.Router();
const multer = require('multer');

//importing controllers
const home_controller = require('../controllers/home_controller');
const file_controller = require('../controllers/file_controller');
const uploadFile = multer({ dest: 'uploads/files'}).single('file');

//router
router.get('/', home_controller.home);
router.post('/upload', uploadFile,file_controller.upload);
router.get('/view/:id', file_controller.view);
router.get('/delete/:id', file_controller.delete);


module.exports = router;