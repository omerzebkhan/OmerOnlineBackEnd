const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

///////////////////////////Sending email ///////////////////////////

// const nodemailer = require('nodemailer');
// let mailTransporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: 'omerzebpak@gmail.com',
//       pass: 'pvceflmttntudqux'
//   }
// });

// let mailDetails = {
//   from: 'xyz@gmail.com',
//   to: 'omerzebkhan@gmail.com',
//   subject: 'Test mail',
//   text: 'Node.js testing mail for GeeksforGeeks'
// };

// mailTransporter.sendMail(mailDetails, function(err, data) {
//   if(err) {
//       console.log('Error Occurs');
//   } else {
//       console.log('Email sent successfully');
//   }
// });


////////////////////////////////////////////////////////////////////////


const app = express();
global.__basedir = __dirname;


const db = require("./App/models");
db.sequelize.sync();


//In case of the first time use the following then comment it for the second time
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

var corsOptions = {
 origin: ["http://localhost:90","http://localhost:3000","http://localhost:8081","https://protected-gorge-40768.herokuapp.com","https://omerwholesale-dbe41ec6a9be.herokuapp.com","http://44.210.87.201:8081/"]
 //origin: "https://protected-gorge-40768.herokuapp.com"
};
app.use(cors(corsOptions));
 
// // parse requests of content-type - application/json
app.use(bodyParser.json());
//app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: true }));

//app.use(bodyParser.text({type: 'text/xml'}));

// Function to serve all static files
// inside public directory.
//app.use(express.static('uploads'));  
const path = require('path')
//app.use(express.static('uploads')); 
app.use('/images', express.static(path.join(__dirname,'App/uploads'))); 
app.use('/img',express.static(path.join(__dirname, 'App/uploads/brandsImages')));
//app.use('/', router);
//app.use('/static', express.static(path.join(__dirname, 'uploads')))

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to omer application server." });
});
// app.use(function (req, res) {
//   res.status(404).render('error');
// });

app.use((req, res, next) => { 
  console.log("App request");
 // console.log(req.method, req.url,req.body.saleInvoiceId);
   next() })


require("./App/routes/online.routes")(app);

////////////////////////////////////////
//////////////////AUTH//////////////////
////////////////////////////////////////
require('./App/routes/auth.routes')(app);
require('./App/routes/user.routes')(app);

// set port, listen for requests
var PORT=""
////////////local
if (process.env.REACT_APP_LOCALSERVER==="True"){
  PORT = process.env.PORT || 8080;
}
else 
{
  PORT = process.env.PORT || 5000 ;
};
//const PORT = process.env.PORT || 8080;
////////////Remote heruko
//const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});