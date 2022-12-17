module.exports = (sequelize, Sequelize) => {
    const CashFlowPayment = sequelize.define("cashFlowPayment", {
       
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

    return CashFlowPayment;
};