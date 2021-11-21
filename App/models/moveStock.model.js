module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("StockMovement", {
        itemId: {
            type: Sequelize.INTEGER
        },
        online: {
            type: Sequelize.INTEGER
        },
        showroom: {
            type: Sequelize.INTEGER
        },
        warehouse: {
            type: Sequelize.INTEGER
        }
        
       
    });

    return Item;
};