//const { brands } = require("../models");
const db = require("../models");
const OwnerStock = db.ownerStock;
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

  // Create a owner Stock
  const data = {
    ownerid: req.body.ownerid,
    itemid: req.body.itemid,
    avgcost: req.body.avgcost,
    quantity: req.body.quantity
  };

  // Save Owner Stock in the database
  OwnerStock.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      //console.log(err)
      console.log(err.errors[0].message)
      res.status(500).send({
        message:
        `Error :Owner Stock Creation ${err.message} ${err.errors[0].message} `
      });
    });
};

///write procedure to get stock of the specific item with specific owner id
exports.getOSByOwnerAndItem = async (req, res) => {
    const ownerId = req.params.ownerId;
    const itemId = req.params.itemId;
  
    var data = "";
    //customerId==="0" ? 
    data = await db.sequelize.query(`
    select * from "ownerStocks" where ownerid=${ownerId} and itemId=${itemId};`, {
      // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
      type: db.sequelize.QueryTypes.SELECT
    })
      .catch(err => {
        console.log(err.message || "Some error Executing OwnerStockByOwnerAndItem ")
        res.status(500).send({
          message:
            err.message || "Some error Executing OwnerStockByOwnerAndItem"
        });
      })
  
  
    return res.status(200).json(data)
  
  
  }

// Update a ownerStock by the id in the request which is unique for each ownerid + itemid
exports.update = (req, res) => {

    const id = req.params.id;
   
    OwnerStock.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          console.log("OwnerStock Record has been update......")
          res.send({
            message: "OwnerStock was updated successfully....."
  
          });
        } else {
          console.log("Some problem in the OwnerStock update")
          console.log(num)
          res.send({
            message: `Cannot update OwnerStock with id=${id}. Maybe Item was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Item with id=" + id
        });
      });
  };