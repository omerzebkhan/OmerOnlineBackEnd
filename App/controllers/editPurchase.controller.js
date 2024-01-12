const db = require("../models");
const EditPurchase = db.editPurchase;
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
  const editPurchase = {
    purchaseinvoiceid:req.body.purchaseinvoiceid,
    purchasedetailid:req.body.purchasedetailid,
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
  EditPurchase.create(editPurchase)
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
exports.findAllEditPurchase = async (req, res) => {
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;
  const itemId = req.params.itemId;
  const invoiceId = req.params.invoiceId;

  var purchaseProfit = "";

  var queryFilter = `and ("editPurchases"."createdAt" between '${startedDate}' and '${endDate}') `;
  

  
  if (itemId !== "0") {
    queryFilter = `${queryFilter} and  "editPurchases"."itemid" = ${itemId}`;
  }
  if (invoiceId !== "0") {
    queryFilter = ""
    queryFilter = `and  "editPurchases"."saleinvoiceid" = ${invoiceId}`;
  }

  console.log(`${queryFilter}`)

  
  purchaseProfit = await db.sequelize.query(`SELECT "editPurchases".id, purchaseinvoiceid, purchasedetailid, itemid, oldprice, oldqty, newprice, newqty, finalprice, finalqty, comments, beforeqty, "editPurchases"."createdAt", "editPurchases"."updatedAt"
	,items.name
	FROM "editPurchases",items
	where "editPurchases".itemid = items.id
  ${queryFilter};`, {
    replacements: { startDate: req.params.sDate, endDate: req.params.eDate },
    type: db.sequelize.QueryTypes.SELECT
  })
    .catch(err => {
      console.log(err.message || "Some error Executing edit purchase ")
      res.status(500).send({
        message:
          err.message || "Some error Executing purchase edit "
      });
    })

  return res.status(200).json(purchaseProfit)
}
