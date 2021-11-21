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
        console.log(`Awt controller is called with ...${roles[i].name}`)
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
        console.log(`Awt controller is called with ...${roles[i].name}`)
        if (roles[i].name === "admin") {
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

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isAdminOrPurchaseAgent: isAdminOrPurchaseAgent
};
module.exports = authJwt;