const db = require("../models");
const Expense = db.expense;
const Op = db.Sequelize.Op;



// Create and Save a new User
exports.create = (req, res) => {
    
   
    // Create a User data object
    const data = {
      name: req.body.name,
      description: req.body.description,
      amount: req.body.amount,
      expensedate: req.body.expensedate
    };
    console.log(data);
    Expense.create(data)
      .then(data => {
  
        res.send(data)
  
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };
  