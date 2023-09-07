const db = require("../models");
const Access = db.access;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a Brand
  const user = {
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    email  : req.body.email,
    description : req.body.description,
    ph     : req.body.ph,
    role   : req.body.role,
    totalamount :req.body.totalamount,
    outstanding : req.body.Outstanding,
    comments :req.body.comments 
    
  };
  //console.log(`data entered = ${user}`)
  // Save user in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  // const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.findAccessByRole = async(req,res) =>{
  const roleId = req.params.id;

  const finalRes = await db.sequelize.query(`
  select * from accesses where "roleId" = ${roleId};`, {
    replacements: { itemId: req.params.itemId },
    type: db.sequelize.QueryTypes.SELECT
  });
  console.log(finalRes)
  return res.status(200).json(finalRes)

}

exports.updateRoleAccess = (req,res) =>{
  const roleId = req.params.id;
  const data = req.body;
//  console.log(`roleid = ${roleId} and data = ${data[0].screenname}`)
//   var data = "";
//   //customerId==="0" ? 
data.map((item,index) => {
  //console.log(`screen Name = ${item.screenname}  rights = ${item.status}`)
  db.sequelize.query(`update accesses set status =${item.status=="1" ?"true":"false"} where "screenName" ='${item.screenname}' and "roleId"='${roleId}';`, {
    // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
    type: db.sequelize.QueryTypes.UPDATE
  })
  .then((result => {
    console.log(result[1])
    // if(result[1]===1)
    // {
    //   console.log("User has been activated")
    //   return res.status(200).send({
    //     message:
    //        "User has been activated"
    //   });
    // }
    // else
    // {
    //   console.log("Unable to verify your OTP")
    //   return res.status(418).send({
    //     message:
    //        "Unable to verify OTP"
    //   });
   // }
    
  }))
    .catch(err => {
      console.log(err.message || "Some error Executing sellingItemTrend with date")
      res.status(500).send({
        message:
          err.message || "Some error Executing sellingItemTrend query"
      });
    })

})

return res.status(200).json(data)

}

// Update a user by the id in the request
exports.update = (req, res) => {
  
  const id = req.params.id;
  // console.log(`brand update is triggred
  // id=${id}
  // imageurl = ${req.body.imageUrl}`);
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};
//////////////////////////////
/////////jwt Auth////////////
////////////////////////////
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.aPa = (req, res) => {
  res.status(200).send("Admin Or Purchase Content.");
};

exports.saleAgent = (req, res) => {
  res.status(200).send("Admin Or SaleAgent Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};