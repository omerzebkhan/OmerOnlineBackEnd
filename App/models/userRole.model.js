module.exports = (sequelize, Sequelize) => {
    const userRole = sequelize.define("user_roles", {
      roleId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      }
    });
  
    return userRole;
  };