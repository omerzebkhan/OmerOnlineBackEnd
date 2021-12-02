const db = require("../models");
const SubCategory = db.subcategories;
const Op = db.Sequelize.Op;

// Create and Save a new sub Category
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a Sub Category
  const subCat = {
    name: req.body.name,
    description: req.body.description,
    category:req.body.category,
    url: req.body.url
  };

  // Save Tutorial in the database
  SubCategory.create(subCat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sub Category."
      });
    });
};

// Retrieve all Sub Category from the database.
exports.findAll = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  SubCategory.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sub Category."
      });
    });
};

// Find a single Sub Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SubCategory.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sub Category with id=" + id
      });
    });
};

// Update a Sub Category by the id in the request
exports.update = (req, res) => {
  
  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  SubCategory.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "sub category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update sub category with id=${id}. Maybe sub category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sub Category with id=" + id
      });
    });
};

// Delete a Sub Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SubCategory.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sub Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Sub Category with id=${id}. Maybe Sub Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sub Category with id=" + id
      });
    });
};

// Delete all Sub Category from the database.
exports.deleteAll = (req, res) => {
  SubCategory.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} sub cat were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sub cat."
      });
    });
};

// Find all sub cat under specific category 
exports.findSubCatUnderCat = (req, res) => {
  const id = req.params.id;
  SubCategory.findAll({ where: { category: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Brand.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find specific sub cat
exports.findOne = (req, res) => {
  const id = req.params.id;

  SubCategory.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sub category with id=" + id
      });
    });
};






//