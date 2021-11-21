const db = require("../models");
const UserRole = db.userRole;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
  
    // Create a Role
    const data = {
      roleId: req.body.roleId,
      userId: req.body.userId
    };
    //console.log(`data entered = ${user}`)
    // Save user in the database
    UserRole.create(data)
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

  // Retrieve all purchase by customer id  from the database.
exports.findAllByUserId = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  UserRole.findAll({
    where :{userId : id }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sale."
      });
    });
};

// Update a Role by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  UserRole.update(req.body, {
    where: { userId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Role was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};


