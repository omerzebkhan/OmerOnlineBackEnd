const db = require("../models");
const CashFlow = db.cashFlow;
const Op = db.Sequelize.Op;

// Create and Save a new Brand
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  const data = {
    amount: req.body.amount,
    mode: req.body.mode,
    type : req.body.type,
    comments : req.body.comments,
    outstanding : req.body.outstanding
  };

  // console.log(`brand data = 
  // name : ${req.body.name},
  // description: ${req.body.description},
  // url: ${req.body.url}`)

  CashFlow.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cash Flow"
      });
    });
};

// Retrieve all cashFlow from the database.
exports.findAll = async (req, res) => {
    const type = req.params.mode;

    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    const cashFlowAR = await db.sequelize.query(
      `select *
      from "cashFlows"
      where outstanding >0
      and type = '${type}';`
      , {
      type: db.sequelize.QueryTypes.SELECT
    });
  
  
    return res.status(200).json(cashFlowAR)
  
  };
  
  // Update a Cash Flow by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  CashFlow.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cash Flow was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cash Flow with id=${id}. Maybe Cash Flow was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cash Flow with id=" + id
      });
    });
};


