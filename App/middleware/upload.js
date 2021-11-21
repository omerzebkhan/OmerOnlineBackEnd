const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`path should be ${__basedir}${req.body.path}`);
    cb(null, __basedir + req.body.path);
  },
  filename: (req, file, cb) => {
    //console.log("checking parameters");
    //console.log(file.originalname);
    //console.log(file);
    //console.log(req.body.filename);
    //const lastDot = file.originalname.lastIndexOf('.');
    //const fileName = file.originalname.substring(0, lastDot);
    //const ext = file.originalname.substring(lastDot + 1);
    // console.log(`file name should be ${req.body.filename}.${ext}`);
   // file.originalname = `${req.body.filename}.${ext}`;
   console.log(`file name should be ${req.body.filename}`);
   cb(null, req.body.filename);
  //  console.log(`file name should be ${file.originalname}`);
  //  cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;