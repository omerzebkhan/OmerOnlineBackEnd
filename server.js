const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
global.__basedir = __dirname;


const db = require("./App/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
 
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Function to serve all static files
// inside public directory.
//app.use(express.static('uploads'));  
const path = require('path')
//app.use(express.static('uploads')); 
app.use('/images', express.static('App/uploads')); 
app.use('/img',express.static(path.join(__dirname, 'App/uploads/brandsImages')));
//app.use('/', router);
//app.use('/static', express.static(path.join(__dirname, 'uploads')))

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// app.use(function (req, res) {
//   res.status(404).render('error');
// });

require("./App/routes/online.routes")(app);

////////////////////////////////////////
//////////////////AUTH//////////////////
////////////////////////////////////////
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
//const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});