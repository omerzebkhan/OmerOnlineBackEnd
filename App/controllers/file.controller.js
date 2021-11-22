const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";

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

const getImage = (req,res) => {
  console.log(req);
  var fs = require('fs');
  const fileName = req.body.filename;
  const directoryPath = __basedir + `${req.body.path}`;
  console.log(`filename = ${req.body}
              directoryPath = ${directoryPath}`)

 // fs.readFile(__basedir + '/App/uploads/brandsImages/1.jpg',function(err,data){
  fs.readFile(`${directoryPath}${fileName}`,function(err,data){
    console.log(err)
    if (err) throw err; // Fail if the file can't be read.
    res.writeHead(200,{'Content-Type':'image/jpeg'});
    res.end(data); // Send the file data to the browser.
  })
};

module.exports = {
  upload,
  getListFiles,
  download,
  getImage,
};