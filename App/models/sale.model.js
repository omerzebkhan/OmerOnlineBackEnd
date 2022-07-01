module.exports = (sequelize, Sequelize) => {
    const Sale = sequelize.define("sale", {
        reffInvoice: {
            type: Sequelize.STRING
        },
        customerId: {
            type: Sequelize.INTEGER
        },
        agentid: {
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

    return Sale;
};