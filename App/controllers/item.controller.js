const { brands } = require("../models");
const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

// Create and Save a new Item
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a Brand
  const item = {
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    imageUrl:' ',
    brandId: req.body.brandId,
    categoryId: req.body.categoryId,
    subCategoryId: req.body.subCategoryId,
    quantity: req.body.quantity,
    online: req.body.online,
    showroom: req.body.showroom,
    warehouse: req.body.warehouse,
    onlineprice: req.body.onlineprice,
    onlinediscount: req.body.onlinediscount,
    showroomprice: req.body.showroomprice,
    averageprice: req.body.averageprice
  };

  // Save Tutorial in the database
  Item.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Item.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};

// Retrieve all Item from the database.
exports.findAll = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  // get all brands
 
  //Item.findAll({include:["brands","categories","subcategories"]})
  Item.findAll({include:["brands","categories","subcategories"]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Items."
      });
    });
};

// Retrieve all Item from the database for specific CAT
exports.findAllByCat = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  // get all brands
 
  
  Item.findAll(
    {include:["brands","categories","subcategories"],where: {categoryId:id}}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Items."
      });
    });
};



// Update a Item by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  Item.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + id
      });
    });
};




// Update a Item Stock movement details 
exports.updateStockValue = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  Item.update({
    online: req.body.online,
    showroom : req.body.showroom,
    warehouse :req.body.warehouse
  }
  ,{where: { id: id }}
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + id
      });
    });
};

