module.exports = (sequelize, Sequelize) => {
    const SaleInvoicePayment = sequelize.define("saleInvoicePayment", {
       reffInvoice: {
            type: Sequelize.INTEGER
        },
        cashPayment: {
            type: Sequelize.DOUBLE
        },
        bankPayment: {
            type: Sequelize.DOUBLE
        },
        comments: {
            type: Sequelize.STRING
          }
    });

    return SaleInvoicePayment;
};