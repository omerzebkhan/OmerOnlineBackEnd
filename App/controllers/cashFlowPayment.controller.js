const db = require("../models");
const CashFlowPayment = db.cashFlowPayment;
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

  // Save cash flow payment Detail in the database
  CashFlowPayment.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cash flow payment."
          
      });
    });
};

// Retrieve all cashFlow payment from the database.
exports.findAllByReffId = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  CashFlowPayment.findAll({where :{reffInvoice : id }})
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