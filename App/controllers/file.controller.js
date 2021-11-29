const uploadFile = require("../middleware/upload");
const uploadImageS3 = require("../middleware/uploadS3");
const Aws = require('aws-sdk')                // aws-sdk library will used to upload image to s3 bucket.


const fs = require("fs");
//const baseUrl = "http://localhost:8080/files/";

//////////////////Store Image on the Amazons S3/////////////////////////////

const uploadS3 = async (req, res) => {
  try {
    console.log(`S3 file upload is called`)
    await uploadImageS3(req, res);
    console.log(`S3 processing ....`)
    console.log(req.file)  // to check the data in the console that is being uploaded


    // Now creating the S3 instance which will be used in uploading photo to s3 bucket.
    const s3 = new Aws.S3({
      //accessKeyId: process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
      //secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
      accessKeyId: "AKIAT2JRYAGKFRZGZZJV",              // accessKeyId that is stored in .env file
      secretAccessKey: "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"        // secretAccessKey is also store in .env file
    })
    // Definning the params variable to uplaod the photo

    const params = {
      Bucket: "omerimages",      // bucket that we made earlier
      Key: req.body.filename,               // Name of the image
      Body: req.file.buffer,                    // Body which will contain the image in buffer format
      ACL: "public-read-write",                 // defining the permissions to get the public link
      ContentType: "image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };

    // uplaoding the photo using s3 instance and saving the link in the database.

    s3.upload(params, (error, data) => {
      if (error) {
        res.status(500).send({ "err": error })  // if we get any error while uploading error message will be returned.
      }

      // If not then below code will be executed

      console.log(data)
      res.status(200).send({
        message: "Amazone file Uploaded successfully",
         data,
        // message: "Uploaded the file successfully: " + req.file.originalname,
      });
      //send back the response so db will be updated with the proper link
    })

      // if (req.file == undefined) {
      //   return res.status(400).send({ message: "Please upload a file!" });
      // }

      // res.status(200).send({
      //   message: "Uploaded the file successfully: " + req.body.filename,
      //   // message: "Uploaded the file successfully: " + req.file.originalname,
      // });
    } catch (err) {
      console.log(err)
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }
      res.status(500).send({
        message: `Could not upload the file: ${req.body.filename}. ${err}`,

      });
    }
  };



  ////////////////////////////////////////////////////////////////////




  //////////////////////////Store file on the local Server////////////////
  const upload = async (req, res) => {
    try {
      await uploadFile(req, res);

      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.body.filename,
        // message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      console.log(err)
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }
      res.status(500).send({
        message: `Could not upload the file: ${req.body.filename}. ${err}`,

      });
    }
  };

  const getListFiles = (req, res) => {
    const directoryPath = __basedir + '/uploads/';

    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }

      let fileInfos = [];

      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });

      res.status(200).send(fileInfos);
    });
  };

  const download = (req, res) => {
    console.log(req);
    const fileName = req.params.name;
    const directoryPath = __basedir + `${req.body.path}`;

    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };

  const getImage = (req, res) => {
    console.log(req);
    var fs = require('fs');
    const fileName = req.body.filename;
    const directoryPath = __basedir + `${req.body.path}`;
    console.log(`filename = ${req.body}
              directoryPath = ${directoryPath}`)

    // fs.readFile(__basedir + '/App/uploads/brandsImages/1.jpg',function(err,data){
    fs.readFile(`${directoryPath}${fileName}`, function (err, data) {
      console.log(err)
      if (err) throw err; // Fail if the file can't be read.
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data); // Send the file data to the browser.
    })
  };

  /////////////////////////////////////////////////////////////////////


  module.exports = {
    upload,
    uploadS3,
    getListFiles,
    download,
    getImage,
  };