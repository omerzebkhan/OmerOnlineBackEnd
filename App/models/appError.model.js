module.exports = (sequelize, Sequelize) => {
    const AppError = sequelize.define("apperror", {
        userId: {
        type: Sequelize.INTEGER
      },
      screenname: {
        type: Sequelize.STRING
      },
      functionname: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      }
    });
  
    return AppError;
  };