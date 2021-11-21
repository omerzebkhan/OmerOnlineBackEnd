module.exports = (sequelize, Sequelize) => {
    const SaleDetail = sequelize.define("saleDetail", {
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
        },
        price: {
            type: Sequelize.DOUBLE
        },
        cost:{
            type :Sequelize.DOUBLE
        }
        
    });

    return SaleDetail;
};