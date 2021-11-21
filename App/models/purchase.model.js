module.exports = (sequelize, Sequelize) => {
    const Purchase = sequelize.define("purchase", {
        reffInvoice: {
            type: Sequelize.STRING
        },
        supplierId: {
            type: Sequelize.INTEGER
        },
        invoicevalue: {
            type: Sequelize.DOUBLE
        },
        totalitems: {
            type: Sequelize.INTEGER
        },
        paid: {
            type: Sequelize.DOUBLE
        },
        Returned: {
            type: Sequelize.DOUBLE
        },
        Outstanding: {
            type: Sequelize.DOUBLE
        }
    });

    return Purchase;
};