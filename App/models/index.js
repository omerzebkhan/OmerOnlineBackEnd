const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //operatorsAliases: false,
  operatorsAliases: 0,
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.brands = require("./brand.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.subcategories = require("./subCategory.model")(sequelize, Sequelize);
db.items = require("./item.model")(sequelize, Sequelize);
db.purchases = require("./purchase.model")(sequelize, Sequelize);
db.purchaseDetail = require("./purchaseDetail.model")(sequelize, Sequelize);
db.expense = require("./expense.model")(sequelize, Sequelize);
db.sales = require("./sale.model")(sequelize, Sequelize);
db.carts = require("./cart.model")(sequelize, Sequelize);
db.cartDetail = require("./cartDetail.model")(sequelize, Sequelize);
///////////////////////////////////////////////////////////////////
//Creating one to many relationship between cart and cartDetails//
//////////////////////////////////////////////////////////////////
db.carts.hasMany(db.cartDetail,{as : "cartDetail"})   
db.cartDetail.belongsTo(db.carts,{foreignKey:"cartid",as :"carts"});
//////////////////////////////////////////////////////////////////
//Creating one to many relationship between saleDetails and item//
//////////////////////////////////////////////////////////////////
db.saleDetail = require("./saleDetail.model")(sequelize, Sequelize);
//db.saleDetail.hasMany(db.items);
db.items.hasMany(db.saleDetail,{as : "saleDetails"})   
db.saleDetail.belongsTo(db.items,{foreignKey:"itemId",as :"items"});
///////////////////////////////////////////////////////////////////
//Creating one to many relationship between item and brands//
//////////////////////////////////////////////////////////////////
//db.saleDetail.hasMany(db.items);
db.brands.hasMany(db.items,{as : "itemDetails"})   
db.items.belongsTo(db.brands,{foreignKey:"brandId",as :"brands"});
///////////////////////////////////////////////////////////////////
//Creating one to many relationship between item and Category//
//////////////////////////////////////////////////////////////////
//db.saleDetail.hasMany(db.items);
db.categories.hasMany(db.items,{as : "itemDetails"})   
db.items.belongsTo(db.categories,{foreignKey:"categoryId",as :"categories"});
///////////////////////////////////////////////////////////////////
//Creating one to many relationship between item and SubCategory//
//////////////////////////////////////////////////////////////////
//db.saleDetail.hasMany(db.items);
//db.subcategories.hasMany(db.items,{as : "itemDetails"})   
db.items.belongsTo(db.subcategories,{foreignKey:"subCategoryId",as :"subcategories"});
///////////////////////////////////////////////////////////////////

db.moveStock = require("./moveStock.model")(sequelize, Sequelize);
db.saleReturn = require("./saleReturn.model")(sequelize, Sequelize);
db.saleInvoicePayment = require("./saleInvoicePayment.model")(sequelize, Sequelize);
db.purchaseInvoicePayment = require("./purchaseInvoicePayment.model")(sequelize, Sequelize);

db.users = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.users, {through: "user_roles",foreignKey: "roleId",otherKey: "userId"});
db.users.belongsToMany(db.role, {through: "user_roles",foreignKey: "userId",otherKey: "roleId"});

db.refreshToken = require("./refreshToken.model.js")(sequelize, Sequelize);
db.refreshToken.belongsTo(db.users, {foreignKey: 'userId', targetKey: 'id'});
db.users.hasOne(db.refreshToken, {foreignKey: 'userId', targetKey: 'id'});

db.access = require("./access.model")(sequelize, Sequelize);
db.ROLES = ["user", "admin", "moderator"];

db.userRole = require("./userRole.model")(sequelize, Sequelize);



module.exports = db;