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

// Retrieve all sale from the database.
exports.findAllAR = async (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  const saleAR = await db.sequelize.query('select * from (select "customerId","name","address",sum(invoicevalue) "saleInvoiceValue",sum(sales."Outstanding") "salesOutstanding" from sales,users where sales."customerId" = users.id group by "customerId","name","address") sa where "salesOutstanding" >0', {
       type: db.sequelize.QueryTypes.SELECT
  });

  
  return res.status(200).json(saleAR)
  
};


// Re calculate the totalitems and invoicevalue
exports.getSaleRecalculate = async (req, res) => {
  console.log(`calling get sale Recalculate.....`)
  const id = req.params.id;

  const [results, metadata] = await db.sequelize.query('update sales set totalitems = (select sum(quantity) from "saleDetails" where "saleInvoiceId" = '+id+'), invoicevalue = (select sum(price*quantity) from "saleDetails" where "saleInvoiceId" = '+id+'),"Outstanding" = (select sum(price*quantity) from "saleDetails" where "saleInvoiceId" = '+id+') where id = '+id+';'
    );

  console.log(metadata
    
    )
  res.send(metadata);

};

//Summary by date get all items sold within the given date
exports.findAllByDateSummary = async (req,res) =>{

  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const customerId = req.params.customerId;
  var data ="";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select "name",sum("saleDetails"."quantity") from "saleDetails","items" 
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

 //get latest two sale item of the customer
exports.findlatestSale = async (req,res) =>{

  const itemId = req.params.itemId;
  const customerId = req.params.customerId;
  var data ="";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select "users"."name","items"."name","saleDetails"."price","saleDetails"."createdAt" from "saleDetails","sales","users","items"
  where sales.id = "saleDetails"."saleInvoiceId" and "sales"."customerId" = "users".id and "saleDetails"."itemId"="items"."id"
  and sales."customerId" = ${customerId}
  and "saleDetails"."itemId" = ${itemId}
  order by "saleDetails"."createdAt" desc
  limit 2`, {
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


 // Retrieve all sales with profit
 exports.findAllByDateProfit = async(req,res) =>
 {
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const customerId = req.params.customerId;
  var saleProfit ="";
  customerId==="0" ? 
  saleProfit = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) totalitems,sum(quantity*price) "invoicevalue",sum(quantity*cost) "invoice cost",sum(quantity*price) - sum(quantity*cost) "profit" ,
  TO_CHAR("sales"."createdAt",'dd/mm/yyyy') date,"sales"."customerId","users"."name"  from "saleDetails","sales","users" 
  where  "saleDetails"."saleInvoiceId" = "sales"."id" and "sales"."customerId" = "users".id and ("sales"."createdAt" between '${startedDate}' and '${endDate}')
  group by "sales"."customerId","users"."name","saleInvoiceId",TO_CHAR("sales"."createdAt",'dd/mm/yyyy')
  order by "saleInvoiceId" DESC;`, {
   // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
    type: db.sequelize.QueryTypes.SELECT
  })
  .catch(err => {
    console.log(err.message || "Some error Executing sale profit query with date")
    res.status(500).send({
      message:
        err.message || "Some error Executing sale profit query"
    });
  })
  :
  saleProfit = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) totalitems,sum(quantity*price) "invoicevalue",sum(quantity*cost) "invoice cost",sum(quantity*price) - sum(quantity*cost) "profit" ,
  TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy') date,"sales"."customerId","users"."name"  from "saleDetails","sales","users" 
  where  "saleDetails"."saleInvoiceId" = "sales"."id" and "sales"."customerId" = "users".id and "sales"."customerId" = ${customerId}
  group by "sales"."customerId","users"."name","saleInvoiceId",TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy')
  order by "saleInvoiceId" DESC;`, {
    replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
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
  Sale.findAll({
   where : {"createdAt" : {[Op.between] : [startedDate , endDate ]}},
   include:["customers"],
   order: [['id', 'ASC'],]
  } )
   .then(data => {res.send(data);})
   .catch(err => {res.status(500).send({
       message:err.message || "Some error occurred while retrieving Sale."
     }); })
  :
  Sale.findAll({
    where : {"createdAt" : {[Op.between] : [startedDate , endDate ]},"customerId":customerId}
   //condition
   ,include:["customers"],
   order: [['id', 'ASC'],]
  } )
   .then(data => {res.send(data); })
   .catch(err => {res.status(500).send({
       message:         err.message || "Some error occurred while retrieving Sale."
     });   });
  

  
};

// Retrieve all sale from the database.
exports.findAllByCustId = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Sale.findAll({
    where :{customerId : id },
    include:["customers"],
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

// Find a single Sale Invice with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sale.findByPk(id,{include:["customers"]})
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



// Delete a Sale based on sale invoice id
exports.delete = (req, res) => {
  const id = req.params.id;

  Sale.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale Invoice was deleted successfully!"
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