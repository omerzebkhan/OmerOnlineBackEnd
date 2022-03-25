const { saleDetail } = require("../models/index.js");
const tutorials = require("../controllers/tutorial.controller.js");
const controller = require("../controllers/file.controller");
const brand = require("../controllers/brand.controller");
const category = require("../controllers/category.controller");
const subcategory = require("../controllers/subCategory.controller");
const item = require("../controllers/item.controller");
const user = require("../controllers/user.controller");
const role = require("../controllers/role.controller");
const purchase = require("../controllers/purchase.controller");
const purchasedetail = require("../controllers/purchaseDetail.controller");
const purchasePayment = require("../controllers/purchaseInvoicePayment.controller");
const moveStock = require("../controllers/moveStock.controller");
const sale = require("../controllers/sale.controller");
const saledetail = require("../controllers/saleDetail.controller");
const saleReturn = require("../controllers/saleReturn.controller");
const salePayment = require("../controllers/saleInvoicePayment.controller");
const userRole = require("../controllers/userRole.controller")
const report = require("../controllers/Report.controller")
const expense = require("../controllers/expense.controller");
const cart = require("../controllers/cart.controller");
const cartDetail = require("../controllers/cartDetail.controller");

const {authJwt} = require("../middleware");
const controller1 = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleware");

module.exports = app => {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  var router = require("express").Router();
  ////////////////
  /////CART//////
  ////////////////
  // Create a new Cart
  router.post("/cart/",[authJwt.verifyToken, authJwt.isAdmin], cart.create);

  // Retrieve all Brand
  router.get("/brand/", brand.findAll);

  
  ////////////////
  /////CART DETAIL//////
  ////////////////
  // Create a new Cart Detail
  
  router.get("/cartDetailByCust/:id",cartDetail.findCartDetailByCust);

  // Update a cart Detail with id
  router.put("/cartDetail/:id", cartDetail.update);


  ////////////////
  /////BRNAD//////
  ////////////////
  // Create a new Brand
  router.post("/brand/",[authJwt.verifyToken, authJwt.isAdmin], brand.create);

  // Retrieve all Brand
  router.get("/brand/", brand.findAll);

  // Update a Brand with id
  router.put("/brand/:id", brand.update);

  ////////////////
  ////CATEGORY////
  ////////////////
  // Create a new Category
  router.post("/Category/",[authJwt.verifyToken, authJwt.isAdmin], category.create);

  // Retrieve all Category
  router.get("/Category/", category.findAll);

  // Update a Category with id
  router.put("/Category/:id", category.update);

  ////////////////
  //SUB CATEGORY//
  ////////////////
  // Create a new SubCategory
  router.post("/subCategory/",[authJwt.verifyToken, authJwt.isAdmin],subcategory.create);

  // Retrieve all SubCategory
  router.get("/subCategory/", subcategory.findAll);

  // Update a SubCategory with id
  router.put("/subCategory/:id", subcategory.update);

  // Retrieve all sub cat under the cat id send as parameter
  router.get("/subCategory/:id", subcategory.findSubCatUnderCat);


  ////////////////
  //////ITEM//////
  ////////////////
  // Create a new Item
  router.post("/item/",[authJwt.verifyToken, authJwt.isAdmin], item.create);

  // Retrieve specific Item
  router.get("/item/:id", item.findOne);

  // Retrieve all Item
  router.get("/item/", item.findAll);

  // Retrieve all Item
  router.get("/itemPurchaseHistory/:itemId", item.purchaseHistory); 

  // Retrieve all Item
  router.get("/itemSaleHistory/:itemId", item.saleHistory); 

  // Retrieve all Item with specific category
  router.get("/itemByCat/:id", item.findAllByCat);


  // Update a Item with id
  router.put("/item/:id", item.update);

 
  // Update Item purchase invoice values
 // router.put("/itemUpdateStock/:id", item.updateStock);

 

  // Update Item Stock a Item for stock values
  router.put("/itemUpdateStockValue/:id", item.updateStockValue);

  




  ////////////////
  //////USER//////
  ////////////////
  // Create a new User
  router.post("/user/",[
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    authJwt.verifyToken, 
    authJwt.isAdmin], user.create);
  
  // Retrieve all Item
  router.get("/user/", user.findAll);

  // Retrieve specific User
  router.get("/user/:id", user.findOne);

  // Update a Item with id
  router.put("/user/:id", user.update);

  // Create a new Role
  router.post("/role/",[authJwt.verifyToken, authJwt.isAdmin], role.create);
  
  // Retrieve all Role
  router.get("/role/", role.findAll);

  // Create a new Role
  router.post("/userRole/",[authJwt.verifyToken, authJwt.isAdmin], userRole.create);

  // Update user Role
  router.put("/userRole/:id", userRole.update);




  
  ////////////////
  ////PURCHASE////
  ////////////////
  // Create a new Purchase
  router.post("/purchase/",[authJwt.verifyToken, authJwt.isAdminOrPurchaseAgent],purchase.create);

  // Retrieve all Purchase
  router.get("/purchase/", purchase.findAll);

  // Retrieve all Purchase Account Payable
  router.get("/purchaseAP/", purchase.findAllAP);

  // Delete Purchase with purchase id
  router.delete("/purchase/:id", purchase.delete);
  

// get all Purchase by given date
  router.get("/purchaseByDate/:sDate/:eDate", purchase.findAllByDate);
  

  //Retrive Purchase invoice for given customer
  router.get("/purchaseByCustId/:id", purchase.findAllByCustId);

  // Update a Purchase with id
  router.put("/updatePurchase/:id", purchase.update);

   // Recalculate the Sale based on the invoice ID
   router.put("/getPurchaseRecalculate/:id", purchase.getPurchaseRecalculate);

  ///////////////////////
  ////PURCHASE DETAIL////
  //////////////////////
  // Create a new Purchase
  router.post("/purchaseDetail/",[authJwt.verifyToken, authJwt.isAdmin], purchasedetail.create);

  // Retrieve all Purchase Details based on the purchase invoice id
  router.get("/purchaseDetailById/:id", purchasedetail.findById);

  // Retrieve all Purchase
  router.get("/purchaseDetail/", purchasedetail.findAll);

  //UpdatePurchaseDetail
  router.put("/UpdatePurchaseDetail/:id", purchasedetail.update);

  // Delete purchase Detail with purchase invoice id
  router.delete("/PurchaseDetailByPurchaseId/:id", purchasedetail.deleteByPurchaseInvoice);

  // Delete Purchase Detail with sale detail id
  router.delete("/purchaseDetail/:id", purchasedetail.delete);

  ////////////////////////////////
  ////Purchase Invoice Payment////
  ////////////////////////////////
  // Create a new sale
  router.post("/createPurchaseInvPay/", purchasePayment.create);

  // Retrieve purchase invoice payment based on the sale invoice id
  router.get("/purchaseInvPay/:id", purchasePayment.findAllByReffId);



  ////////////////////
  ////Sale Inovice////
  ///////////////////
  // Create a new Sale
  router.post("/sale/",[authJwt.verifyToken, authJwt.isAdmin], sale.create);

  // Retrieve all Sale
  router.get("/sale/", sale.findAll);

  // Delete Sale with sale id
  router.delete("/sale/:id", sale.delete);

// Retrieve all Sale Account Recievable
  router.get("/saleAR/", sale.findAllAR);
  
  // Recalculate the Sale based on the invoice ID
  router.put("/getSaleRecalculate/:id", sale.getSaleRecalculate);

  //Retrive Sale invoice for given customer
  router.get("/saleByCustId/:id", sale.findAllByCustId);

  // get all Sale by given date
  router.get("/SaleByDate/:sDate/:eDate/:customerId", sale.findAllByDate);


  // Retrieve sale by its ID
  router.get("/sale/:id", sale.findOne);

  // //updateSaleRIvOTi
  // router.put("/updateSaleRIvOTi/:id", sale.update);

  //updateSaleRIvOTi
  router.put("/updateSale/:id", sale.update);

  // Update a Sale with id
  router.put("/sale/:id", sale.update);

  

  ///////////////////
  ////SALE DETAIL////
  //////////////////
  // Create a new sale
  router.post("/saleDetail/",[authJwt.verifyToken, authJwt.isAdmin], saledetail.create);

  // Retrieve all sale
  router.get("/saleDetail/", saledetail.findAll);

  // Delete Sale Detail with sale detail id
  router.delete("/saleDetail/:id", saledetail.delete);

  // Delete Sale Detail with sale invoice id
  router.delete("/SaleDetailBySaleId/:id", saledetail.deleteBySaleInvoice);


  // Retrieve all SaleDetails based on the sale invoice id
  router.get("/saleDetailById/:id", saledetail.findById);

  //UpdateSaleDetailQP
  router.put("/UpdateSaleDetailQ/:id", saledetail.updateQ);

  //UpdateSaleDetail
  router.put("/UpdateSaleDetail/:id", saledetail.update);

  ///////////////////
  ////SALE Return////
  //////////////////
  // Create a new sale
  router.post("/saleReturn/",[authJwt.verifyToken, authJwt.isAdmin], saleReturn.create);

  ////////////////////////////
  ////SALE Invoice Payment////
  ///////////////////////////

  // Create a new sale
  router.post("/createSaleInvPay/", salePayment.create);

  // Retrieve purchase invoice payment based on the sale invoice id
  router.get("/saleInvPay/:id", salePayment.findAllByReffId);

  ////////////////////////////
  ////Expense////
  ///////////////////////////

  // Create a new expense
  router.post("/expense/", expense.create);


  ////////////////
  //Other Reports//
  ////////////////

  // get Balance Sheet
  router.get("/BalanceSheetByDate/:sDate/:eDate", report.findBalanceSheet);  


  ////////////////
  //Tutorails//
  ////////////////
  // Create a new Tutorial
  router.post("/", tutorials.create);



  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  // upload file
  router.post("/upload", controller.upload);

  // upload file to Amazon S3
  router.post("/uploadS3", controller.uploadS3);
  
  // get all files list
  router.get("/get/files", controller.getListFiles);
  // get specific file
  router.get("/files/:name", controller.download);
  // get single file 
  router.post("/get/image", controller.getImage);

  
  app.use('/online/', router);


  
};