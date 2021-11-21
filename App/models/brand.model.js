module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define("brand", {
        name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      }
    });
  
    return Brand;
  };