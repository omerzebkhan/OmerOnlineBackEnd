const db = require("../models");
const PurchaseDetail = db.purchaseDetail;
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

  // Create a Purchase
  const purchaseDetail = {
    purchaseInvoiceId: req.body.PurchaseInvoiceId,
    itemId: req.body.itemName,
    quantity: req.body.quantity,
    price: req.body.price 
  };

  console.log(`purchase details
  ${purchaseDetail.purchaseInvoiceId}
  ${purchaseDetail.itemId}
  ${purchaseDetail.quantity}
  ${purchaseDetail.price}`)

  // Save purchase Detail in the database
  PurchaseDetail.create(purchaseDetail)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Purchase Detail."
          
      });
    });
};

// Retrieve all purchase Detail from the database.
exports.findAll = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    PurchaseDetail.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Purchase Detail."
        });
      });
  };

  