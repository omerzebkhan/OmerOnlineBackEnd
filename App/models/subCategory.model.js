module.exports = (sequelize, Sequelize) => {
    const SubCategories = sequelize.define("subcategories", {
        name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.INTEGER
      },
      imageUrl: {
        type: Sequelize.STRING
      }
    });
  
    return SubCategories;
  };