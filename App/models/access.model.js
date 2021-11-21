module.exports = (sequelize, Sequelize) => {
    const Access = sequelize.define("access", {
        roleId: {
        type: Sequelize.INTEGER
      },
      screenName: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }
    });
  
    return Access;
  };