module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cartDetail", {
    cartid: {
        type: Sequelize.INTEGER
      },
      itemid: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(10,3)
      },
      cost: {
        type: Sequelize.DECIMAL(10,3)
      }
    });
  
    return Cart;
  };