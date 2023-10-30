const db = require("../models");
const SaleInvoicePayment = db.saleInvoicePayment;
const Op = db.Sequelize.Op;

// Create and Save a Sale
exports.create = (req, res) => {
  
  // Create a Sale
  const data = {
    reffInvoice: req.body.reffInvoice,
    cashPayment: req.body.cashPayment,
    bankPayment: req.body.bankPayment,
    comments:req.body.comments
  };
  // console.log(`
  // sale invoice id = ${req.body.reffInvoice}
  // ${data.reffInvoice}
  // cash = ${data.itemId}
  // bank =${data.quantity} 
  // `
  // )

  // Save sale Detail in the database
  SaleInvoicePayment.create(data)
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

  SaleInvoicePayment.findAll({where :{reffInvoice : id }})
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

// Retrieve all sale invoice payment from the database.
// AR screen 
exports.findPayHist = async (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  var saleProfit ="";
  saleProfit = await db.sequelize.query(`select users.id as userId,users.name,sales.id as sid,"saleInvoicePayments".id as sipid,"saleInvoicePayments"."createdAt","saleInvoicePayments"."cashPayment","saleInvoicePayments"."bankPayment","saleInvoicePayments"."comments" 
  from "saleInvoicePayments","users","sales"
  where "saleInvoicePayments"."reffInvoice" = "sales".id and "sales"."customerId" = "users".id
  and users.id = ${id}
  order by "saleInvoicePayments"."createdAt" desc;`, {
    type: db.sequelize.QueryTypes.SELECT
  })
  .catch(err => {
    console.log(err.message || "Some error Executing sale profit query with customer")
    res.status(500).send({
      message:
        err.message || "Some error Executing sale profit query with customer"
    });
  })
  return res.status(200).json(saleProfit)
};