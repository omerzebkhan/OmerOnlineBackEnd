const db = require("../models");
const Sale = db.sales;
const Op = db.Sequelize.Op;

// Create and Save a new sale
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a Sale
  const sale = {
    reffInvoice: req.body.reffInvoice,
    customerId: req.body.customerId,
    invoicevalue: req.body.invoicevalue,
    totalitems: req.body.totalitems,
    paid: req.body.paid,
    Returned: req.body.Returned,
    Outstanding: req.body.Outstanding
  };

  // Save sale in the database
  Sale.create(sale)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sale."
      });
    });
};

// Retrieve all sale from the database.
exports.findAll = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Sale.findAll()
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

// Re calculate the totalitems and invoicevalue
exports.getSaleRecalculate = (req, res) => {
  const id = req.params.id;

  db.sequelize.query('update sales set totalitems = (select sum(quantity) from "saleDetails" where "saleInvoiceId" = :id), invoicevalue = (select sum(price*quantity) from "saleDetails" where "saleInvoiceId" = :id),"Outstanding" = (select sum(price*quantity) from "saleDetails" where "saleInvoiceId" = :id) where id = :id;'
  , {replacements: {id: req.params.id},type: db.sequelize.QueryTypes.update}
  ).spread(function(results,
  	metadata) {
      res.send(metadata);
  // Results will be an empty array and metadata will contain the number of 
  // affected rows.
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
  const customerId = req.params.customerId;
  var condition = customerId==="0" ? 
  {where : {"createdAt" : {[Op.between] : [startedDate , endDate ]}}}
  :{where : {"createdAt" : {[Op.between] : [startedDate , endDate ]},"customerId":customerId}} ;
  
  Sale.findAll(
    condition
  )
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

// Retrieve all sale from the database.
exports.findAllByCustId = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Sale.findAll({
    where :{customerId : id }
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

// Find a single Sale Invice with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sale.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sale Invoice with id=" + id
      });
    });
};

// Update a Sale by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  Sale.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sale with id=${id}. Maybe Sale was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sale with id=" + id
      });
    });
};

// Update sale Returned, Invoce value, Outstanding ,Total Item
exports.updateRIvOTi = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  Sale.update({
    //quantity: req.body.quantity,
    Returned: req.body.Returned,
    invoicevalue: req.body.invoicevalue,
    Outstanding: req.body.Outstanding,
    totalitems: req.body.totalitems
  }
    , { where: { id: id } }
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

// Update sale Outstanding
exports.updateO = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  Sale.update({
    //quantity: req.body.quantity,
    Outstanding: req.body.Outstanding
  }
    , { where: { id: id } }
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