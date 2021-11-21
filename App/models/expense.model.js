module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expense", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DOUBLE
        },
        expensedate: {
            type: Sequelize.DATE
        },
        
    });

    return Expense;
};