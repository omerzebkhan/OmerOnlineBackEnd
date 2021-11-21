const db = require("../models");
const SaleReturn = db.saleReturn;
const Op = db.Sequelize.Op;

// Create and Save a Sale
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a Sale
  const data = {
    saleInvoiceId: req.body.saleInvoiceId,
    itemId: req.body.itemId,
    quantity: req.body.quantity
  };
//   console.log(`
//   sale invoice id = ${req.body.itemId}
//   ${data.saleInvoiceId}
//   item id = ${data.itemId}
//   quantity =${data.quantity} 
//   `
//   )

  // Save sale Detail in the database
  SaleReturn.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sale Detail."
          
      });
    });
};