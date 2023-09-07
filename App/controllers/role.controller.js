const db = require("../models");
const Role = db.role;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
  
    // Create a Role
    const role = {
      name: req.body.name
    };
    //console.log(`data entered = ${user}`)
    // Save user in the database
    Role.create(role)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Role."
        });
      });
  };

// Retrieve all Role from the database.
exports.findAll = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Role.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

  function writeCustomError(message) {
    var errorObject = {};
    errorObject.message = message;
    errorObject.code = 10001; // as you want
    errorObject.status = "failed";
    return errorObject;
  }
  