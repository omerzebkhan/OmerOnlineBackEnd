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

// Retrieve all purchase Account Payable
exports.findAllAP = async (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  const purchaseAP = await db.sequelize.query('select * from (select "supplierId","name","address",sum(invoicevalue) "purchaseInvoiceValue",sum(purchases."Outstanding") "purchaseOutstanding" from purchases,users where purchases."supplierId" = users.id group by "supplierId","name","address") sa where "purchaseOutstanding" > 0', {
    type: db.sequelize.QueryTypes.SELECT
  });


  return res.status(200).json(purchaseAP)

};

// Re calculate the totalitems and invoicevalue
exports.getPurchaseRecalculate = async (req, res) => {
  console.log(`calling get purchase Recalculate.....`)
  const id = req.params.id;
  const [results, metadata] = await db.sequelize.query('update purchases set totalitems = (select sum(quantity) from "purchaseDetails" where "purchaseInvoiceId" = '+id+'), invoicevalue = (select sum(price*quantity) from "purchaseDetails" where "purchaseInvoiceId" = '+id+'),"Outstanding" = (select sum(price*quantity) from "purchaseDetails" where "purchaseInvoiceId" = '+id+') where id = '+id+';'
    );

  console.log(metadata  
    )
  res.send(metadata);

};

//Summary by date get all items sold within the given date
exports.findAllByDateSummary = async (req, res) => {

  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const customerId = req.params.customerId;
  var data = "";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select "name",sum("saleDetails"."quantity") from "purchaseDetails","items" 
  where "saleDetails"."itemId" = items.id and   ("saleDetails"."createdAt" between '${startedDate}' and '${endDate}') 
  group by "name" order by "name";`, {
    // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
    type: db.sequelize.QueryTypes.SELECT
  })
    .catch(err => {
      console.log(err.message || "Some error Executing sale summary query with date")
      res.status(500).send({
        message:
          err.message || "Some error Executing sale summary query"
      });
    })


  return res.status(200).json(data)
}

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
  customerId==="0" ? 
  Purchase.findAll({
    where : {"createdAt" : {[Op.between] : [startedDate , endDate ]}},
    include:["suppliers"],
    order: [['id', 'ASC'],]
  })
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send({
       message:err.message || "Some error occurred while retrieving Purchase."
      });   })
      :
  Purchase.findAll({
    where : {"createdAt" : {[Op.between] : [startedDate , endDate ]},"supplierId":customerId}
   //condition
   ,include:["suppliers"],
   order: [['id', 'ASC'],]
  } )
   .then(data => {res.send(data); })
   .catch(err => {res.status(500).send({
       message:         err.message || "Some error occurred while retrieving Sale."
     });   });
};

// Retrieve all purchase by customer id  from the database.
exports.findAllByCustId = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Purchase.findAll({
    where: { supplierId: id },
    include:["suppliers"],
    order: [['id', 'ASC'],]
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

// Delete a Purchase based on purchase invoice id
exports.delete = (req, res) => {
  const id = req.params.id;

  Purchase.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Purchase Invoice was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Purchase Invoice with id=${id}. Maybe Purchase Invoice was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message ||"Could not delete Purchase Invoice with id=" + id
      });
    });
};

