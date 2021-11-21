module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        ph: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        totalamount: {
            type: Sequelize.DOUBLE
        },
        outstanding: {
            type: Sequelize.DOUBLE
        },
        comments: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
        
    });

    return User;
};