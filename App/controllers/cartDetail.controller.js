const { cartDetail } = require("../models");
const db = require("../models");
const Cart = db.carts;
const CartDetail = db.cartDetail;
const Op = db.Sequelize.Op;

// Create and Save a new Brand
exports.create = (req, res) => {
 
  // Create a Cart data
  const data = {
    cartid: req.body.cartid,
    itemid: req.body.itemid,
    quantity:req.body.quantity,
    status:req.body.cartstatus
  };

//   console.log(`brand data = 
//   name : ${req.body.name},
//   description: ${req.body.description},
//   url: ${req.body.url}`)

  // Save Tutorial in the database
  CartDetail.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.findCartDetailByCust = async (req, res) => {
    
  
  console.log(req.params.id)

    const data = await db.sequelize.query(`select carts.id,carts.userid,"cartDetails".itemid,items.name,items.description,items.onlineprice,items."imageUrl","cartDetails"."id" as cartid,"cartDetails"."quantity","cartDetails"."createdAt" 
    from "cartDetails"
    join carts on "cartDetails".cartid = carts.id
    join items on "cartDetails".itemid = items.id
    where carts.userid = ${req.params.id} and carts.status = 'InProgress' and "cartDetails".status='Add'
    order by "cartDetails".id desc`, {
      // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
      type: db.sequelize.QueryTypes.SELECT
    })
    .catch(err => {
      console.log(err.message || "Some error occurred while retrieving Items.")
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Items."
      });
    }); 
   // cartDetail.findAll({include:["carts"]})
   // Cart.findAll({include:["cartDetails"]})
    
   return res.status(200).json(data)

  };

// Update a cart Detail by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
 console.log(req.body.quantity)
  cartDetail.update(req.body, {
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
  

