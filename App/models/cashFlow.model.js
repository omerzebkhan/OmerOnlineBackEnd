module.exports = (sequelize, Sequelize) => {
    const CashFlow = sequelize.define("cashFlow", {
        amount : {
            type: Sequelize.DOUBLE
      },
      outstanding : {
        type: Sequelize.DOUBLE
      },
      mode: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      comments :{
        type: Sequelize.STRING
      }
    });
  
    return CashFlow;
  };