module.exports = (sequelize, Sequelize) => {
    const ownerStock = sequelize.define("ownerStock", {
    ownerid: {
        type: Sequelize.INTEGER
      },
      itemid: {
        type: Sequelize.INTEGER
      },
      avgcost: {
        type: Sequelize.DOUBLE
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.STRING
      }
    });
  
    return ownerStock;
  };