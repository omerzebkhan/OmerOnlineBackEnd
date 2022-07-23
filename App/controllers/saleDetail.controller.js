const db = require("../models");
const SaleDetail = db.saleDetail;
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
  const saleDetail = {
    saleInvoiceId: req.body.saleInvoiceId,
    itemId: req.body.itemName,
    quantity: req.body.quantity,
    price: req.body.price,
    cost: req.body.cost,
    srno:req.body.srno 
  };
  console.log(`
  sale invoice id = ${req.body.saleInvoiceId}
  ${saleDetail.saleInvoiceId}
  item id = ${saleDetail.itemId}
  quantity =${saleDetail.quantity} 
  price  = ${saleDetail.price}
  cost = ${saleDetail.cost}
  srno = ${saleDetail.srno}`
  )

  // Save sale Detail in the database
  SaleDetail.create(saleDetail)
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

// Retrieve all sale Detail from the database.
exports.findAll = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    SaleDetail.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Sale Detail."
        });
      });
  };

  // Retrieve all sale Detail & item table from the database.
exports.findById = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  const id = req.params.id;
  SaleDetail.findAll({
    include:["items"],
     where: {saleInvoiceId: id},
     order: [
      ['srno', 'ASC'],
  ],
  }
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sale Detail."
      });
    });
};

// Update a Sale Detail with Quantity and profit 
exports.updateQ = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  SaleDetail.update({
    quantity: req.body.quantity
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

// Update a Sale Detail  
exports.update = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  SaleDetail.update(req.body
  ,{where: { id: id }}
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale Detail was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sale Detail with id=${id}. Maybe Sale Detail was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sale Detail with id=" + id
      });
    });
};

// Delete a Sale Detail based on sale Detail id
exports.delete = (req, res) => {
  const id = req.params.id;

  SaleDetail.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale Detail Invoice was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Sale Invoice with id=${id}. Maybe Sale Invoice was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message ||"Could not delete Sale Invoice with id=" + id
      });
    });
};

// Delete a Sale Detail based on sale invoice id
exports.deleteBySaleInvoice = (req, res) => {
  const id = req.params.id;

  SaleDetail.destroy({
    where: { saleInvoiceId: id },
    order: ['id', 'DESC']
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale Detail Invoice was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Sale Invoice with id=${id}. Maybe Sale Invoice was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message ||"Could not delete Sale Invoice with id=" + id
      });
    });
};
  