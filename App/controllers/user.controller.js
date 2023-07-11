const db = require("../models");
const User = db.users;
const UserRole = db.userRole;
const Role = db.role;
const Op = db.Sequelize.Op;
const { generateOTP } = require('../services/opt');
const { sendMail } = require('../services/emailService');


const getPagination = (page, size) => {
 // const limit = size ? +size : 3;
  const limit = size ;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit,newData) => {
 // console.log(`count = ${data.count}  rows = ${data.rows}  `)
  //var objArr = [];
  const { count: totalItems} = data;
  var user = newData;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, user, totalPages, currentPage };
};

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }
  var bcrypt = require("bcryptjs");
  // Create a User data object
  const user = {
    name: req.body.name,
    address: req.body.address,
    mobile: req.body.mobile,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    description: req.body.description,
    ph: req.body.ph,
    totalamount: req.body.totalamount,
    outstanding: req.body.Outstanding,
    comments: req.body.comments,
    otp:generateOTP()

  };
  console.log(`data entered = ${user.otp}`)
  // Save user in the database

  User.create(user)
    .then(data => {
      ////////////////////SEND email for the user with OTP
      // try {
      //   await sendMail({
      //     to: user.email,
      //     OTP: otpGenerated,
      //   });
      res.send(data)
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
 

  const { page, size } = req.query;
 // console.log(`page = ${page} size = ${size}`)
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);



  var uroles;
  var role;
  var roleList = [];
  UserRole.findAll()
    .then(data => {
      // console.log(`role value ===== ${data[0].roleId}
      //  user id = ${data[0].userId}`)
      uroles = data;
      ////get all roles ///////
      Role.findAll()
        .then(data1 => {
          //console.log(`role executed successfully....`)
          role = data1;

          // compare and update witht the role name in the user profile
          role.map((r) => {
            uroles.map((ur) => {
              //console.log(`role id = ${r.id}
              //role name = ${r.name}`)
              if (r.id === ur.roleId) {
                var tmp = { "id": r.id, "name": r.name, "userId": ur.userId };
                // console.log(`role id = ${tmp.id}
                //          role name = ${tmp.name}
                //          userId = ${tmp.userId}`)
                roleList.push(tmp)

              }
            })

          })
         // console.log(`role list values ${roleList[0].id}`)

          //////////////////get all subscribers 
          User.findAndCountAll({limit, offset })
          //User.findAll()
            .then(d => {
            
             // console.log(`repsonse to be sent =${d.count}  ${d.rows}`)
            
              var newData = []
              d.rows.map((item, index) => {
                var obj = JSON.parse(JSON.stringify(item));
                var roleValue = "";
                roleList.map((i)=>{
                  //console.log(`${i.userId} === ${item.id}`)
                  if (i.userId ===item.id)
                  {
                    roleValue = i.name
                  }
                  obj.roles = roleValue;
                })

                newData.push(obj);
                //console.log(newData.roles)


              }),
                // console.log(`role value ===== ${newData[8].roles}`)
                 response = getPagingData(d, page, limit,newData)
                  // console.log(`total items ===== ${response.totalItems}
                  // user = ${response.user} ,
                  // ${response.totalPages},
                  // ${response.currentPage}`)
               // res.send(response);
                res.send(response)
            })
            .catch(err => {
              console.log(err.message);
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving users."
              });
            });


          ///////////////////////////////////////






        })
        .catch(err => {
          console.log(err.message)
        });

      /////////////////////////





    })
    .catch(err => {
      // obj.roles='';
      // newData.push(obj);
      console.log(err.message)
    })



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

// Update a user by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  //console.log(`Updating user  id=${id} `);
  var bcrypt = require("bcryptjs");
  if (req.body.password){
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  }

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

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};