module.exports = (sequelize, Sequelize) => {
    const EditSale = sequelize.define("editSale", {
        saleinvoiceid: {
            type: Sequelize.INTEGER
        },
        saledetailid: {
            type: Sequelize.INTEGER,
        },
        itemid: { 
            type: Sequelize.INTEGER
        },
        oldprice: {
            type: Sequelize.DOUBLE
        },
        oldqty:{
            type :Sequelize.INTEGER
        },
        newprice: {
            type: Sequelize.DOUBLE
        },
        newqty:{
            type :Sequelize.INTEGER
        },
        finalprice: {
            type: Sequelize.DOUBLE
        },
        finalqty:{
            type :Sequelize.INTEGER
        },
        comments :{
            type: Sequelize.STRING
          },
        beforeqty:{
            type :Sequelize.INTEGER
         }    
    });

    return EditSale;
};