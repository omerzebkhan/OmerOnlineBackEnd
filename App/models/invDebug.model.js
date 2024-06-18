module.exports = (sequelize, Sequelize) => {
    const InvDebug = sequelize.define("invdebug", {
     invbefore:{
        type:Sequelize.INTEGER
     },
     invafter:{
        type:Sequelize.INTEGER
     },
     totalitems:{
        type:Sequelize.INTEGER
     },
     invid :{
        type:Sequelize.INTEGER
     },
     invtype : {
        type:Sequelize.STRING
     },
        userid: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      }
    });
  
    return InvDebug;
  };