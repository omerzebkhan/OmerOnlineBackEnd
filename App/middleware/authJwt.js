const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(`verification token is called......${token} req=${req.headers}`)

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdminOrPurchaseAgent = (req, res, next) =>{


  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      // need to know each roles has access to which screen and send that list back 
      // to client to compare with their screen
      // this will return list of all access to client
      // client will check on each page if requester is having access to the page or not 
      //e.g. role admins is having aceess to add item = true else add item = false
      for (let i = 0; i < roles.length; i++) {
        console.log(`Awt controller is called with isAdminorPurchaseAgent ...${roles[i].name}`)
        if (roles[i].name === "admin") {
          next();
          return;
        }
        if (roles[i].name === "purchaseAgent") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Or Purchase Agent Required Role!"
      });
      return;
    });
  });
}

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        console.log(`Awt controller is called with isAdmin ...${roles[i].name}`)
        if (roles[i].name === "admin"  ) {
          next();
          return;
        }
        if (roles[i].name == "saleAgent"  ) {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        console.log(`role name is ...${roles[i].name}`)
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

/////////////verify the creen acccess based on the route used/////////////
checkScreenAccess = async (req,res,next) =>{
  console.log(req)
  console.log(req.route.path)  // /purchase/

  var data ="";
  //customerId==="0" ? 
  data = await db.sequelize.query(`select * from accesses,"user_roles" where
  accesses."roleId" = "user_roles"."roleId"
  and "user_roles"."userId" = ${req.userId}`, {
   // replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
    type: db.sequelize.QueryTypes.SELECT
  })
  .catch(err => {
    console.log(err.message || "Some error Executing findlatestPurchse query with date")
    res.status(500).send({
      message:
        err.message || "Some error Executing findlatestPurchse query"
    });
  })
  
  //console.log(data)
  var access = 'False'
  data.map((i)=>{
    // console.log(`screen name = ${i.screenName}  ** status = ${i.status}`)
    if (i.screenName == 'Add Brand' && i.status == 'true' && req.route.path =='/brand/' )
    {  access = 'True'  }
    else if (i.screenName == 'Add Category' && i.status == 'true' && req.route.path =='/Category/' )
    {  access = 'True'  }
    else if (i.screenName == 'Add subCategory' && i.status == 'true' && req.route.path =='/subCategory/' )
    {  access = 'True'  }
    else if (i.screenName == 'Search subCategory' && i.status == 'true' && req.route.path =='/subCategory/' )
    {  access = 'True'  }
    else if (i.screenName == 'Search Brand' && i.status == 'true' && req.route.path =='/brand/' )
      {  access = 'True'  }
    else if (i.screenName == 'Add Item' && i.status == 'true' && req.route.path =='/item/' )
    {  access = 'True'  }
    else if (i.screenName == 'Search Item' && i.status == 'true' && req.route.path =='/item/' )
    {  access = 'True'  }
    else if (i.screenName == 'Purchase Invoice' && i.status == 'true' && req.route.path =='/purchase/' )
    {  access = 'True'  }
    else if (i.screenName == 'Purchase Invoice' && i.status == 'true' && req.route.path =='/purchase/' )
    {  access = 'True'  }
    else if (i.screenName == 'Update Purchase' && i.status == 'true' && req.route.path.startsWith('/UpdatePurchaseDetail/') )
    {  access = 'True'  }
    else if (i.screenName == 'Move Stock' && i.status == 'true' && req.route.path.startsWith('/item/') )
    {  access = 'True'  }
    else if (i.screenName == 'Sale Invoice' && i.status == 'true' && req.route.path == ('/sale/') )
    {  access = 'True'  }
    else if (i.screenName == 'Sale Return' && i.status == 'true' && req.route.path == ('/saleReturn/') )
    {  access = 'True'  }
    else if (i.screenName == 'Update Sale' && i.status == 'true' && req.route.path.startsWith('/item/') )
    {  access = 'True'  }
    //Pricing should be handled by fronend only because it is using same route.path from other paths
    else if (i.screenName == 'Account Receivable' && i.status == 'true' && req.route.path == ('/saleAR/') )
    {  access = 'True'  }
    else if (i.screenName == 'Account Payable' && i.status == 'true' && req.route.path == ('/purchaseAP/') )
    {  access = 'True'  }
    //Add expense should be managed by frontend for the time being
    //Add user
    //Search user
    //Add role
    //Update access
    // Add Cash Flow
    // Cash AR
    // Cash AP
    //Stock Report
    //Purchse Report
    //Sale Report
    //Sale Return Report
    //Balance Sheet
    //Item limit Report
    //Item Trend Report
    //Monthly Sale
    //Item Sale Purchase Datewise
    //Sale Agent Trend
    //view Cart 
    // these all should be managed by front end because of time limitation.
})
console.log(`acces = ${access}`)
if(access == 'True')
{
 // return res.status(200).json(data)
 next();
 return;
}
else
{
  res.status(403).send({
    message: `Not allowed from the checkScreenAccess for url ${req.route.path}`
    //console.log(`Not allowed from the checkScreenAccess for url ${req.route.path}`)
  });
}
  
  
      
      return;
  //   });
  // });
  
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isAdminOrPurchaseAgent: isAdminOrPurchaseAgent,
  checkScreenAccess:checkScreenAccess
};
module.exports = authJwt;