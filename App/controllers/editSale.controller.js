const db = require("../models");
const EditSale = db.editSale;
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
  const editSale = {
    saleinvoiceid:req.body.saleinvoiceid,
    saledetailid:req.body.saledetailid,
    itemid:req.body.itemid,
    oldprice:req.body.oldprice,
    oldqty:req.body.oldqty,
    newprice:req.body.newprice,
    newqty:req.body.newqty,
    finalprice:req.body.finalprice,
    finalqty:req.body.finalqty,
    beforeqty:req.body.beforeqty,
    comments:req.body.comments
  };

  // Save sale in the database
  EditSale.create(editSale)
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


// Retrieve all edit sales dynamic query filter
exports.findAllEditSale = async (req, res) => {
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const itemId = req.params.itemId;
  const invoiceId = req.params.invoiceId;

  var saleProfit = "";

  var queryFilter = `and ("editSales"."createdAt" between '${startedDate}' and '${endDate}') `;
  

  
  if (itemId !== "0") {
    queryFilter = `${queryFilter} and  "editSales"."itemid" = ${itemId}`;
  }
  if (invoiceId !== "0") {
    queryFilter = ""
    queryFilter = `and  "editSales"."saleinvoiceid" = ${invoiceId}`;
  }

  console.log(`${queryFilter}`)

  // saleProfit = await db.sequelize.query(`select "saleInvoiceId",sum(quantity) totalitems,sum(quantity*price) "invoicevalue",sum(quantity*cost) "invoice cost",sum(quantity*price) - sum(quantity*cost) "profit" ,
  //   TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy') date,"sales"."customerId","users"."name",sales.agentid,agent.name as agentname,sales."Outstanding",sales."Returned"
  //     from "saleDetails","sales","users","users" as agent
  //   where  "saleDetails"."saleInvoiceId" = "sales"."id" and "sales"."customerId" = "users".id 
  //   ${queryFilter}
  //   and "sales".agentid = agent.id
  //   group by sales.agentid,agent.name,"sales"."customerId","users"."name","saleInvoiceId",TO_CHAR("saleDetails"."createdAt",'dd/mm/yyyy'),sales."Outstanding",sales."Returned"
  //   order by "saleInvoiceId" DESC;`, {
  //   replacements: { startDate: req.params.sDate, endDate: req.params.eDate },
  //   type: db.sequelize.QueryTypes.SELECT
  // })
  saleProfit = await db.sequelize.query(`SELECT "editSales".id, saleinvoiceid, saledetailid, itemid, oldprice, oldqty, newprice, newqty, finalprice, finalqty, comments, beforeqty, "editSales"."createdAt", "editSales"."updatedAt"
	,items.name
	FROM "editSales",items
	where "editSales".itemid = items.id
  ${queryFilter};`, {
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

  return res.status(200).json(saleProfit)
}
