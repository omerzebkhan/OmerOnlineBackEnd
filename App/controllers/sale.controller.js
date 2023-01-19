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
  console.log(req.body.reffInvoice)
  // Create a Sale
  const sale = {
    reffInvoice: req.body.reffInvoice,
    customerId: req.body.customerId,
    agentid: req.body.agentid,
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

  const saleAR = await db.sequelize.query(
    `select * from (select "customerId",users."name",users."address",agent.name as agentname,sum(invoicevalue) "saleInvoiceValue",sum(sales."Outstanding") "salesOutstanding" 
    from sales,users,users as agent
    where sales."customerId" = users.id and agentid = agent.id 
    group by "customerId",users."name",users."address",agent.name,"agentid") sa;`
    , {
    type: db.sequelize.QueryTypes.SELECT
  });


  return res.status(200).json(saleAR)

};

// Retrive account recievable by invoice id
exports.findARByInvoiceId = async (req,res) =>{
  const id = req.params.id;

  const saleAR = await db.sequelize.query(
    `select * from 
    (select sales.id,"customerId",users.name,invoicevalue,totalitems,"Outstanding",users.address,a.id as agentid,a.name as agentname
    from sales,users,users as a
    where sales.id = ${id}
    and "customerId" = users.id
    and agentid=a.id) s,
    (select "customerId",users.name,sum(invoicevalue) totalinvoice,sum(outstanding) totaloutstanding from sales,users
    where  "customerId" = users.id
    group by "customerId",users.name) as ssum
    where s."customerId" = ssum."customerId";`
    , {
    type: db.sequelize.QueryTypes.SELECT
  });


  return res.status(200).json(saleAR)
}

// Re calculate the totalitems and invoicevalue
exports.getSaleRecalculate = async (req, res) => {
  console.log(`calling get sale Recalculate.....`)
  const id = req.params.id;
//"Outstanding" = (select sum(price*quantity) from "saleDetails" where "saleInvoiceId" = '${id}') 
  const [results, metadata] = await db.sequelize.query(`
  update sales set 
  totalitems = (select sum(quantity) from "saleDetails" where "saleInvoiceId" = '${id}'),
   invoicevalue = (select sum(price*quantity) from "saleDetails" where "saleInvoiceId" = '${id}'),
   "Outstanding" = (select s.totalinvoice - p.paid from 
    (select sum(price*quantity) as totalinvoice from "saleDetails" where "saleInvoiceId" = '${id}') s,
    (select sum("cashPayment")+sum("bankPayment") as paid from "saleInvoicePayments" where "reffInvoice" = '${id}') p) 
   where id = '${id}';`
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
exports.findlatestSale = async (req, res) => {

  const itemId = req.params.itemId;
  const customerId = req.params.customerId;
  var data = "";
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

// get monthly sale report
exports.getMonthlySale = async (req,res) =>{
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const customerId = req.params.customerId;
  var data = "";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select ROUND(CAST(FLOAT8 (sum(price*quantity)) AS NUMERIC),2) as totalSale,ROUND(CAST(FLOAT8 (sum(quantity)) AS NUMERIC),2) as totalItem,ROUND(CAST(FLOAT8 (sum((price-cost)*quantity)) AS NUMERIC),2) as profit,TO_CHAR("createdAt",'mm/yyyy') as month
  from "saleDetails"
  where   "createdAt" between '${startedDate}' and '${endDate}'
  group by TO_CHAR("createdAt",'mm/yyyy')
  order by TO_CHAR("createdAt",'mm/yyyy') desc;`, {
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

//get agent wise sale report
exports.getSaleAgentTrend = async (req,res) =>{
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const customerId = req.params.customerId;
  var data = "";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select count(*),sum(invoicevalue) as invoicevalue,"name" from sales,users
  where "agentid" = users.id and
  "sales"."createdAt" between '${startedDate}' and '${endDate}'
  --("sales"."createdAt" >= '${startedDate}' and "sales"."createdAt" < '${endDate}')
  group by "name"`, {
    // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
    type: db.sequelize.QueryTypes.SELECT
  })
    .catch(err => {
      console.log(err.message || "Some error sale agent trend")
      res.status(500).send({
        message:
          err.message || "Some error sale agent trend"
      });
    })


  return res.status(200).json(data)
 
}

//get agent wise closed invoice report (AR recieved)
exports.getSaleAgentClosedInvoices = async (req,res) =>{
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const customerId = req.params.customerId;
  var data = "";
  //customerId==="0" ? 
  data = await db.sequelize.query(`  
  select agent as name,monthlysale.invoicevalue as totalsale,sum(tbl.invoicevalue) as invoicevalue,sum(total) as invoicedetailvalue,sum(profit) as profit from (
    select users.name as agent,"Outstanding",invoicevalue,sum(price*quantity) as total,sum((price-cost)*quantity) as profit
    from sales,"saleDetails",users 
    where sales."Outstanding" = 0
    and sales.agentid = users.id
    and sales.id = "saleDetails"."saleInvoiceId"
    and ("sales"."updatedAt" between '${startedDate}' and '${endDate}')
--    and "sales"."updatedAt" >= '2022-12-24 00:00:00' and "sales"."updatedAt" <= '2022-12-25 20:00:00'
    group by users.id,"Outstanding",invoicevalue) as tbl
    full join 
    (select users.name,sum(invoicevalue) as invoicevalue
from sales,users
where sales.agentid= users.id
    and ("sales"."createdAt" between '${startedDate}' and '${endDate}')
-- and ("sales"."createdAt" >= '2022-12-24 00:00:00' and "sales"."createdAt" <= '2022-12-25 20:00:00')
group by users.name
) as monthlysale
on tbl.agent = monthlysale.name
 group by agent,monthlysale.invoicevalue
`, {
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
exports.findAllByDateProfit = async (req, res) => {
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const customerId = req.params.customerId;
  const agentId = req.params.agentId;
  var saleProfit = "";

  if (customerId !== "0" && agentId !== "0") {
    saleProfit = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) totalitems,sum(quantity*price) "invoicevalue",sum(quantity*cost) "invoice cost",sum(quantity*price) - sum(quantity*cost) "profit" ,
    TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy') date,"sales"."customerId","users"."name",sales.agentid,agent.name as agentname
      from "saleDetails","sales","users","users" as agent
    where  "saleDetails"."saleInvoiceId" = "sales"."id" and "sales"."customerId" = "users".id and ("sales"."createdAt" between '${startedDate}' and '${endDate}')
    and "sales"."agentid" = ${agentId}
    and "sales"."customerId" = ${customerId} and "sales".agentid = agent.id
    group by sales.agentid,agent.name,"sales"."customerId","users"."name","saleInvoiceId",TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy')
    order by "saleInvoiceId" DESC;`, {
        replacements: { startDate: req.params.sDate, endDate: req.params.eDate },
        type: db.sequelize.QueryTypes.SELECT
      })
        .catch(err => {
          console.log(err.message || "Some error Executing sale profit query with customer")
          res.status(500).send({
            message:
              err.message || "Some error Executing sale profit query with customer"
          });
        })
  
  }
  else if (customerId !== "0") {
    saleProfit = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) totalitems,sum(quantity*price) "invoicevalue",sum(quantity*cost) "invoice cost",sum(quantity*price) - sum(quantity*cost) "profit" ,
    TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy') date,"sales"."customerId","users"."name",sales.agentid,agent.name as agentname
      from "saleDetails","sales","users","users" as agent
    where  "saleDetails"."saleInvoiceId" = "sales"."id" and "sales"."customerId" = "users".id and ("sales"."createdAt" between '${startedDate}' and '${endDate}')
    and "sales"."customerId" = ${customerId} and "sales".agentid = agent.id
    group by sales.agentid,agent.name,"sales"."customerId","users"."name","saleInvoiceId",TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy')
    order by "saleInvoiceId" DESC;`, {
        replacements: { startDate: req.params.sDate, endDate: req.params.eDate },
        type: db.sequelize.QueryTypes.SELECT
      })
        .catch(err => {
          console.log(err.message || "Some error Executing sale profit query with customer")
          res.status(500).send({
            message:
              err.message || "Some error Executing sale profit query with customer"
          });
        })
  
  }
  else if (agentId !== "0") {
    saleProfit = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) totalitems,sum(quantity*price) "invoicevalue",sum(quantity*cost) "invoice cost",sum(quantity*price) - sum(quantity*cost) "profit" ,
    TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy') date,"sales"."customerId","users"."name",sales.agentid,agent.name as agentname
      from "saleDetails","sales","users","users" as agent
    where  "saleDetails"."saleInvoiceId" = "sales"."id" and "sales"."customerId" = "users".id and ("sales"."createdAt" between '${startedDate}' and '${endDate}')
    and "sales"."agentid" = ${agentId} and "sales".agentid = agent.id
    group by sales.agentid,agent.name,"sales"."customerId","users"."name","saleInvoiceId",TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy')
    order by "saleInvoiceId" DESC;`, {
        replacements: { startDate: req.params.sDate, endDate: req.params.eDate },
        type: db.sequelize.QueryTypes.SELECT
      })
        .catch(err => {
          console.log(err.message || "Some error Executing sale profit query with customer")
          res.status(500).send({
            message:
              err.message || "Some error Executing sale profit query with customer"
          });
        })
  
  }
  else {
    saleProfit = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) totalitems,sum(quantity*price) "invoicevalue",sum(quantity*cost) "invoice cost",sum(quantity*price) - sum(quantity*cost) "profit" ,
    TO_CHAR("sales"."createdAt",'dd/mm/yyyy') date,"sales"."customerId","users"."name",sales.agentid,agent.name as agentname
    from "saleDetails","sales","users" ,"users" as agent
    where  "saleDetails"."saleInvoiceId" = "sales"."id" and "sales"."customerId" = "users".id 
    and ("sales"."createdAt" between '${startedDate}' and '${endDate}') and "sales".agentid = agent.id
    group by sales.agentid,agent.name,"sales"."customerId","users"."name","saleInvoiceId",TO_CHAR("sales"."createdAt",'dd/mm/yyyy')
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
  }

  
    
  return res.status(200).json(saleProfit)
}


// Retrieve all sale from the database.
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
  customerId === "0" ?
    Sale.findAll({
      where: { "createdAt": { [Op.between]: [startedDate, endDate] } },
      include: ["customers"],
      order: [['id', 'ASC'],]
    })
      .then(data => { res.send(data); })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Sale."
        });
      })
    :
    Sale.findAll({
      where: { "createdAt": { [Op.between]: [startedDate, endDate] }, "customerId": customerId }
      //condition
      , include: ["customers"],
      order: [['id', 'ASC'],]
    })
      .then(data => { res.send(data); })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Sale."
        });
      });



};

// Retrieve all sale from the database.
exports.findAllByCustId = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Sale.findAll({
    where: { customerId: id },
    include: ["customers"],
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

  Sale.findByPk(id, { include: ["customers"] })
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
        message: err.message || "Could not delete Sale Invoice with id=" + id
      });
    });
};