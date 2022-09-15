const { brands } = require("../models");
const db = require("../models");
const Item = db.items;
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

  // Create a Brand
  const item = {
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    imageUrl: ' ',
    brandId: req.body.brandId,
    categoryId: req.body.categoryId,
    subCategoryId: req.body.subCategoryId,
    quantity: req.body.quantity,
    online: req.body.online,
    showroom: req.body.showroom,
    warehouse: req.body.warehouse,
    onlineprice: req.body.onlineprice,
    onlinediscount: req.body.onlinediscount,
    showroomprice: req.body.showroomprice,
    averageprice: req.body.averageprice,
    higherlimit: req.body.higherlimit,
    lowerlimit: req.body.lowerlimit
  };

  // Save Tutorial in the database
  Item.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Item.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};

// Retrieve all Item from the database.
exports.findAll = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  // get all brands

  //Item.findAll({include:["brands","categories","subcategories"]})
  Item.findAll({ include: ["brands", "categories", "subcategories"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Items."
      });
    });
};

// Retrieve all Item from the database for specific CAT
exports.findAllByCat = (req, res) => {
  const id = req.params.id;
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  // get all brands


  Item.findAll(
    { include: ["brands", "categories", "subcategories"], where: { categoryId: id } }
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Items."
      });
    });
};

// Get purchase History for the given item
exports.purchaseHistory = async (req, res) => {

  const finalRes = await db.sequelize.query(`
  select purchases.id,users.name as "supplierName","items".name as "itemName","purchaseDetails"."id" as "InvPurId","purchaseDetails"."price","purchaseDetails"."quantity","purchaseDetails"."createdAt" from "purchaseDetails","purchases","users","items" 
 where purchases.id ="purchaseDetails"."purchaseInvoiceId" 
 and users.id = purchases."supplierId"
 and "purchaseDetails"."itemId" = "items".id
  and "purchaseDetails"."itemId" = :itemId;`, {
    replacements: { itemId: req.params.itemId },
    type: db.sequelize.QueryTypes.SELECT
  });
  console.log(finalRes)
  return res.status(200).json(finalRes)
}

// Get sale History for the given item
exports.saleHistory = async (req, res) => {

  const finalRes = await db.sequelize.query(`
  select sales.id,users.name as "customerName","items".name as "itemName","saleDetails"."id" as "InvSaleId","saleDetails"."price","saleDetails"."quantity","saleDetails"."createdAt" from "saleDetails","sales","users","items" 
 where sales.id ="saleDetails"."saleInvoiceId" 
 and users.id = sales."customerId"
 and "saleDetails"."itemId" = "items".id
 and "saleDetails"."itemId" = :itemId
 order by sales.id DESC;`, {
    replacements: { itemId: req.params.itemId },
    type: db.sequelize.QueryTypes.SELECT
  });
  console.log(finalRes)
  return res.status(200).json(finalRes)
}

// Get sale Return for the given item
exports.returnHistory = async (req, res) => {

  const finalRes = await db.sequelize.query(`
  select "saleInvoiceId","saleReturns".id,name,"saleReturns".quantity,"saleReturns"."createdAt"
from "saleReturns","items"
where "saleReturns"."itemId" = items.id
and "saleReturns"."itemId" = :itemId
order by "saleInvoiceId" DESC;`, {
    replacements: { itemId: req.params.itemId },
    type: db.sequelize.QueryTypes.SELECT
  });
  console.log(finalRes)
  return res.status(200).json(finalRes)
}

// Get items for the higer and lower limits
exports.limitReport = async (req, res) => {

  // const finalRes = await db.sequelize.query(`
  // select a.id,a.name,a.quantity,a.lowerlimit,a.higherlimit from items a,items b 
  // where a.id = b.id
  // and (a.quantity <= CAST (b.lowerlimit AS INTEGER) or a.quantity >= CAST (b.higherlimit AS INTEGER))
  // order by a.id asc;`
  const finalRes = await db.sequelize.query(`
  select items.id,items.name,items.quantity,ts.sum as totalsale,ts30days.sum as totalsale30days,ts90days.sum as totalsale90days,ts180days.sum as totalsale180days,ts365days.sum as totalsale365days
--select items.name,items.quantity,ts.sum as totalsale,ts90days.sum as totalsale90days
from items
left outer join 
(select sum("saleDetails".quantity),"itemId" 
from "saleDetails"
group by "itemId") ts
on items.id=ts."itemId"
left outer join 
(select sum("saleDetails".quantity),"itemId" 
from "saleDetails"
where "createdAt" > CURRENT_DATE - INTERVAL '30' day
group by "itemId") ts30days
on items.id=ts30days."itemId"
left outer join 
(select sum("saleDetails".quantity),"itemId" 
from "saleDetails"
where "createdAt" > CURRENT_DATE - INTERVAL '90' day
group by "itemId") ts90days
on items.id=ts90days."itemId"
left outer join 
(select sum("saleDetails".quantity),"itemId" 
from "saleDetails"
where "createdAt" > CURRENT_DATE - INTERVAL '180' day
group by "itemId") ts180days
on items.id=ts180days."itemId"
left outer join 
(select sum("saleDetails".quantity),"itemId" 
from "saleDetails"
where "createdAt" > CURRENT_DATE - INTERVAL '365' day
group by "itemId") ts365days
on items.id=ts365days."itemId"
;`, {
    replacements: { itemId: req.params.itemId },
    type: db.sequelize.QueryTypes.SELECT
  });
  console.log(finalRes)
  return res.status(200).json(finalRes)
}

//get selling item 
exports.sellingItemTrend = async (req, res) => {
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;

  var data = "";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select coalesce(p.totalpurchase,null,0) as totalpurchase,
  coalesce(s.totalsale,null,0) as totalsale,coalesce(s.saleprice,null,0) as saleprice,coalesce(s.cost,null,0) as cost,coalesce(s.profit,null,0) as profit,name,averageprice,quantity from 
  items
  left outer join 
  (select sum("saleDetails".quantity) as totalsale,sum(price)/count(*) as saleprice,sum(cost)/count(*) as cost ,sum(price)/count(*)-sum(cost)/count(*) as profit, "itemId"
  from "saleDetails"
  where  "saleDetails"."createdAt" between '${startedDate}' and '${endDate}'
  group by "itemId"
  ) as s
  on items.id = s."itemId"
  left outer join 
  (select sum("purchaseDetails".quantity) as totalpurchase,"itemId"
  from "purchaseDetails"
  where  "purchaseDetails"."createdAt" between '${startedDate}' and '${endDate}'
  group by "itemId"
  ) as p on items.id = p."itemId"
  ORDER BY CASE WHEN s.totalsale > 0 THEN 3 
              WHEN s.totalsale = 0 THEN 1
              WHEN s.totalsale IS NULL THEN 0 -- Just for readability
         END desc,
s.totalsale desc;`, {
    // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
    type: db.sequelize.QueryTypes.SELECT
  })
    .catch(err => {
      console.log(err.message || "Some error Executing sellingItemTrend with date")
      res.status(500).send({
        message:
          err.message || "Some error Executing sellingItemTrend query"
      });
    })


  return res.status(200).json(data)


}


// Update a Item by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  Item.update(req.body, {
    where: { id: id }
  })
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




// Update a Item Stock movement details 
exports.updateStockValue = (req, res) => {

  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  Item.update({
    online: req.body.online,
    showroom: req.body.showroom,
    warehouse: req.body.warehouse
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

