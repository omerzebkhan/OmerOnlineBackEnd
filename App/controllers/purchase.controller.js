const db = require("../models");
const Purchase = db.purchases;
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
  const purchase = {
    reffInvoice: req.body.reffInvoice,
    supplierId: req.body.supplierId,
    invoicevalue: req.body.invoicevalue,
    totalitems: req.body.totalitems, 
    paid: req.body.paid,
    Returned: req.body.Returned,
    Outstanding: req.body.Outstanding
  };

  // Save purchase in the database
  Purchase.create(purchase)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Purchase."
      });
    });
};

// Retrieve all purchase from the database.
exports.findAll = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Purchase.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Purchase."
        });
      });
  };


  // Retrieve all purchase from the database.
exports.findAllByDate = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  // console.log(`Start date = ${req.params.sDate} should be "2021-09-14 00:00:00"
  // End date= ${req.params.eDate} should be 2021-09-16 00:00:00 `)
  //const startedDate = new Date("2021-09-14 00:00:00");
  //const endDate = new Date("2021-09-16 00:00:00");
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  Purchase.findAll(
    {where : {"createdAt" : {[Op.between] : [startedDate , endDate ]}}}
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Purchase."
      });
    });
};

// Retrieve all purchase by customer id  from the database.
exports.findAllByCustId = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Purchase.findAll({
    where :{supplierId : id }
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

  // Update a Purchase by the id in the request
exports.update = (req, res) => {
  
    const id = req.params.id;
    // console.log(`brand update is triggred
    // id=${id}
    // imageurl = ${req.body.imageUrl}`);
    Purchase.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Purchase was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Purchase with id=${id}. Maybe Purchase was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Purchase with id=" + id
        });
      });
  };
  
  