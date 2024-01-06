module.exports = (sequelize, Sequelize) => {
    const EditPurchase = sequelize.define("purchaseSale", {
        purchaseinvoiceid: {
            type: Sequelize.INTEGER
        },
        purchasedetailid: {
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

    return EditPurchase;
};