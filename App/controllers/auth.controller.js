const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.role;
const Access = db.access;

const RefreshToken = db.refreshToken;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];
      /////check one to many relation to know how following getRoles works
      user.getRoles()
        .then(roles => {
          for (let i = 0; i < roles.length; i++) {
            console.log(`roles are ${roles[i].name.toUpperCase()}
          roles id = ${roles[i].id}`)
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }

          let rights = [];
          //roles.getRights
          Access.findAll({ where: { roleId: roles[0].id } })
            .then(data => {
              for (let i = 0; i < data.length; i++) {
                //console.log(`rights are  ${data[i].screenName.toUpperCase()}+","+${data[i].status.toUpperCase()}`)
                rights.push(data[i].screenName.toUpperCase()+","+data[i].status.toUpperCase());
              }
                res.status(200).send({
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  roles: authorities,
                  rights: rights,
                  accessToken: token,
                  refreshToken: refreshToken,
                });
  
            })
           

            
            })
            .catch(err => {
              res.status(500).send({ message: `No Role assigned to the user error is =${err.message}` });
            });
            ;
        })
        .catch(err => {
          res.status(500).send({ message: `error is =${err.message}` });
        });
    };

  exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
      let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

      console.log(refreshToken)

      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }

      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.destroy({ where: { id: refreshToken.id } });

        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }

      const user = await refreshToken.getUser();
      let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };