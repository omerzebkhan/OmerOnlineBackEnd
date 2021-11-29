//const express = require('express')
//const router = express.Router()               // router will be used to handle the request.
const util = require("util");
const multer = require('multer')              // multer will be used to handle the form data.

//const Product = require('../models/Product')  // our product model.
//require("dotenv/config")           

// creating the storage variable to upload the file and providing the destination folder, 
// if nothing is provided in the callback it will get uploaded in main directory

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

// below variable is define to check the type of file which is uploaded

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// defining the upload variable for the configuration of photo being uploaded
const uploadFile = multer({
     storage: storage, 
     fileFilter: filefilter })
     .single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;




