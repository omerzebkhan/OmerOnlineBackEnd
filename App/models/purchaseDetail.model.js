module.exports = (sequelize, Sequelize) => {
    const PurchaseDetail = sequelize.define("purchaseDetail", {
        purchaseInvoiceId: {
            type: Sequelize.INTEGER
        },
        itemId: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.DOUBLE
        }
        
    });

    return PurchaseDetail;
};