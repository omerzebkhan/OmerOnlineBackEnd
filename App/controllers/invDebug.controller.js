const db = require("../models");
const InvDebgu = db.incDebug;
const Op = db.Sequelize.Op;

// Create and Save a new Brand
exports.create = (req, res) => {


  const data = {
    invbefore: req.body.invbefore,
    invafter: req.body.invafter,
    totalitems : req.body.totalitems,
    invid : req.body.invid,
    invtype : req.body.invtype,
    userid  : req.body.userid,
    description : req.body.description,
    comments : req.body.comments
  };

  // console.log(`brand data = 
  // name : ${req.body.name},
  // description: ${req.body.description},
  // url: ${req.body.url}`)

  InvDebug.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the inv debug"
      });
    });
};

