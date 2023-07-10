const db = require("../models");
const Cart = db.carts;
const CartDetail = db.cartDetail;
const Op = db.Sequelize.Op;

// Create and Save a new Brand
exports.create = (req, res) => {

    // Create a Cart
    const cart = {
        userid: req.body.userid,
        status: 'INPROGRESS'
    };


      console.log(`cart user id = ${cart.userid} 
      status : ${cart.status}
      `)

    // Create Master Cart
    Cart.create(cart)
        .then(data => {
            ///////////////////////Create Cart Details////////////////////////////
            console.log(`cart id = ${data.id}`)
            //Create a Cart Detail
            const cartDetail = {
                cartid:data.id,
                itemid: req.body.itemid,
                quantity: req.body.quantity,
                status: req.body.cartstatus,
                price:req.body.price
            };
            CartDetail.create(cartDetail)
                .then(data1 => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Tutorial."
                    });
                });

            //////////////////////////////////////////////////////////////////////



        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Cart of the user with status InProgress
exports.findAllByUserNStatus = (req, res) => {
    const userid = req.query.userid;
    const status = req.query.status;
    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Cart.findAll({ where: { userid: userid, status: status } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving brands."
            });
        });
};

//get carts by date  
exports.findCartsByDate = async (req, res) => {
  const startedDate = req.params.sDate;
  const endDate = req.params.eDate;

  var data = "";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select carts.id,carts.userid,carts.status,carts."createdAt",users.name,"sumCart".totalqty,"sumCart".totalamount
  from carts,users,(select cartid,sum(quantity) as totalqty,sum(quantity * price) as totalamount from "cartDetails" group by cartid) as "sumCart"
  where carts.userid=users.id
  and carts.id = "sumCart".cartid
  order by "carts".id;`, {
    // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
    type: db.sequelize.QueryTypes.SELECT
  })
    .catch(err => {
      console.log(err.message || "Some error Executing cart with date")
      res.status(500).send({
        message:
          err.message || "Some error Executing cart query"
      });
    })


  return res.status(200).json(data)


}

// Retrieve all Brand from the database.
exports.findAll = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Brand.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving brands."
            });
        });
};

// Find a single Brand with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Brand.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Cart by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;
    // console.log(`brand update is triggred
    // id=${id}
    // imageurl = ${req.body.imageUrl}`);
    Cart.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cart was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};




