const db = require("../models");
const MoveStock = db.moveStock;
const Op = db.Sequelize.Op;

// Create and Save a new Item
exports.create = (req, res) => {
  
  // Create a Move Stock
  const mStock = {
    itemId: req.body.itemId,
    online : req.body.online,
    showroom: req.body.showroom,
    warehouse: req.body.warehouse
  };

  // Save MoveStock in the database
  MoveStock.create(mStock)
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