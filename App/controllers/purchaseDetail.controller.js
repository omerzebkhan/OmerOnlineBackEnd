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

// Update purchase Details  
exports.update = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  PurchaseDetail.update(req.body
  ,{where: { id: id }}
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Purchase Detail was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update purchase Details with id=${id}. Maybe purchase Detils was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating purchase Details with id=" + id
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

  //get latest two sale item of the customer
exports.findlatestPurchse = async (req,res) =>{

  const itemId = req.params.itemId;
  
  var data ="";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select items.id,items.name,"purchaseDetails".price,"purchaseDetails"."createdAt" from "purchaseDetails",items where "purchaseDetails"."itemId"=items.id and 
  "purchaseDetails".id = (
  select max("id") from "purchaseDetails"
  where "itemId"= ${itemId}
  group by "itemId")`, {
   // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
    type: db.sequelize.QueryTypes.SELECT
  })
  .catch(err => {
    console.log(err.message || "Some error Executing findlatestPurchse query with date")
    res.status(500).send({
      message:
        err.message || "Some error Executing findlatestPurchse query"
    });
  })
  

  return res.status(200).json(data)
 }


// Retrieve all purchase Detail & item table from the database.
exports.findById = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  const id = req.params.id;
  PurchaseDetail.findAll({
    include:["items"],
     where: {purchaseInvoiceId: id}
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

// Delete a Purchase Detail based on purchase Detail id
exports.delete = (req, res) => {
  const id = req.params.id;

  PurchaseDetail.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Purchase Detail Invoice was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Purchase Detail Invoice with id=${id}. Maybe Purchase Detail Invoice was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message ||"Could not delete Purchase Detail Invoice with id=" + id
      });
    });
};

// Delete a Purchase Detail based on purchase invoice id
exports.deleteByPurchaseInvoice = (req, res) => {
  const id = req.params.id;

  PurchaseDetail.destroy({
    where: { purchaseInvoiceId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Purchase Detail Invoice was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Purchase Detail Invoice with id=${id}. Maybe Purchase Detail Invoice was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message ||"Could not delete Purchase Detail Invoice with id=" + id
      });
    });
};

