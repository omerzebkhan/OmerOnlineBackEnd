module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
    userid: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      }
    });
  
    return Cart;
  };