module.exports = (sequelize, Sequelize) => {
    const PurchaseInvoicePayment = sequelize.define("purchaseInvoicePayment", {
       
        reffInvoice: {
            type: Sequelize.INTEGER
        },
        cashPayment: {
            type: Sequelize.DOUBLE
        },
        bankPayment: {
            type: Sequelize.DOUBLE
        }
    });

    return PurchaseInvoicePayment;
};