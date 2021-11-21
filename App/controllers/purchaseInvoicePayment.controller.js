const db = require("../models");
const PurchaseInvoicePayment = db.purchaseInvoicePayment;
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
    reffInvoice: req.body.reffInvoice,
    cashPayment: req.body.cashPayment,
    bankPayment: req.body.bankPayment
  };
  console.log(`
  sale invoice id = ${req.body.reffInvoice}
  ${data.reffInvoice}
  item id = ${data.cashPayment}
  quantity =${data.bankPayment} 
  `
  )

  // Save sale Detail in the database
  PurchaseInvoicePayment.create(data)
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

// Retrieve all purchase invoice payment from the database.
exports.findAllByReffId = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  PurchaseInvoicePayment.findAll({where :{reffInvoice : id }})
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