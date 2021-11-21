module.exports = (sequelize, Sequelize) => {
    const SaleReturn = sequelize.define("saleReturn", {
        saleInvoiceId: {
            type: Sequelize.INTEGER
        },
        itemId: {
            type: Sequelize.INTEGER,
            // references: {
            //     model: 'items', // 'fathers' refers to table name
            //     key: 'id', // 'id' refers to column name in fathers table
            //  }
        },

        quantity: { 
            type: Sequelize.INTEGER
        }
        
    });

    return SaleReturn;
};