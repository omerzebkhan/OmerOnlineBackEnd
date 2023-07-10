const db = require("../models");
const SaleReturn = db.saleReturn;
const Op = db.Sequelize.Op;

// Create and Save a Sale Return
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
    saleInvoiceId: req.body.saleInvoiceId,
    itemId: req.body.itemId,
    quantity: req.body.quantity
  };
//   console.log(`
//   sale invoice id = ${req.body.itemId}
//   ${data.saleInvoiceId}
//   item id = ${data.itemId}
//   quantity =${data.quantity} 
//   `
//   )

  // Save sale Detail in the database
  SaleReturn.create(data)
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


//sale return within the given date
exports.findSaleReturnByDate = async (req,res) =>{

  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const customerName = req.params.custName;
  var data ="";
  if (customerName==="0" && (startedDate!==0 || endDate!==0))
  { 
  data = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) as "quantity",users.name,to_char("saleReturns"."createdAt",'dd/mm/yyyy') as "cAt"
  from "saleReturns","sales","users"
  where "saleReturns"."saleInvoiceId" = sales.id and sales."customerId" = users.id
  and ("saleReturns"."createdAt" between '${startedDate}' and '${endDate}')
  group by "saleInvoiceId",to_char("saleReturns"."createdAt",'dd/mm/yyyy'),users.name
order by to_date(to_char("saleReturns"."createdAt",'dd/mm/yyyy'),'dd/mm/yyyy') DESC;`, {
   // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
    type: db.sequelize.QueryTypes.SELECT
  })
  .catch(err => {
    console.log(err.message || "Some error Executing sale summary query with date")
    res.status(500).send({
      message:
        err.message || "Some error Executing sale summary query"
    });
  })}
  else if(customerName!=="0" && (startedDate==="2000-1-01" || endDate==="2000-1-02"))
  {
    data = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) as "quantity",users.name,to_char("saleReturns"."createdAt",'dd/mm/yyyy') as "cAt"
  from "saleReturns","sales","users"
  where "saleReturns"."saleInvoiceId" = sales.id and sales."customerId" = users.id
  and users.name like '%${customerName}%'
  group by "saleInvoiceId",to_char("saleReturns"."createdAt",'dd/mm/yyyy'),users.name
order by to_date(to_char("saleReturns"."createdAt",'dd/mm/yyyy'),'dd/mm/yyyy') DESC;`, {
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

  }
  else if (customerName!=="0" && (startedDate!==0 || endDate!==0))
  {
    data = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) as "quantity",users.name,to_char("saleReturns"."createdAt",'dd/mm/yyyy') as "cAt"
    from "saleReturns","sales","users"
    where "saleReturns"."saleInvoiceId" = sales.id and sales."customerId" = users.id
    and ("saleReturns"."createdAt" between '${startedDate}' and '${endDate}')
    and users.name like '%${customerName}%'
    group by "saleInvoiceId",to_char("saleReturns"."createdAt",'dd/mm/yyyy'),users.name
  order by to_date(to_char("saleReturns"."createdAt",'dd/mm/yyyy'),'dd/mm/yyyy') DESC;`, {
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
  }

  return res.status(200).json(data)
};

//sale return Details within the given invoice id
exports.findSaleReturnDetailByInvoice = async (req,res) =>{

  const id = req.params.id;
  console.log(id)
  var data ="";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select "saleReturns".id,"saleInvoiceId",items.id,items.name,"saleReturns".quantity,"saleReturns"."createdAt","saleReturns"."updatedAt"
  from "saleReturns",items
  where "saleReturns"."itemId" = items.id
  and "saleReturns"."saleInvoiceId"=${id};`, {
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
};
