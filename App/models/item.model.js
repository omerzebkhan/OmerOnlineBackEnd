module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        name: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        brandId: {
            type: Sequelize.INTEGER
        },
        categoryId: {
            type: Sequelize.INTEGER
        },
        subCategoryId: {
            type: Sequelize.INTEGER
        },
        quantity: {
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
        },
        onlineprice: {
            type: Sequelize.DOUBLE
        },
        onlinediscount: {
            type: Sequelize.DOUBLE
        },
        showroomprice: {
            type: Sequelize.DOUBLE
        },
        averageprice: {
            type: Sequelize.DOUBLE
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        higherlimit: {
            type: Sequelize.INTEGER
        },
        lowerlimit: {
            type: Sequelize.INTEGER
        }
    });

    return Item;
};