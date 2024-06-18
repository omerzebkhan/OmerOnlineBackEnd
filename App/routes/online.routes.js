// const { saleDetail } = require("../models/index.js");
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
const purchaseEdit = require("../controllers/editPurchase.controller");
const moveStock = require("../controllers/moveStock.controller");
const sale = require("../controllers/sale.controller");
const saledetail = require("../controllers/saleDetail.controller");
const saleReturn = require("../controllers/saleReturn.controller");
const salePayment = require("../controllers/saleInvoicePayment.controller");
const saleEdit = require("../controllers/editSale.controller");
const userRole = require("../controllers/userRole.controller")
const report = require("../controllers/Report.controller")
const expense = require("../controllers/expense.controller");
const cart = require("../controllers/cart.controller");
const cartDetail = require("../controllers/cartDetail.controller");
const cashFlow = require("../controllers/cashFlow.controller");
const cashFlowPayment = require("../controllers/cashFlowPayment.controller");
const invDebug = require("../controllers/invDebug.controller");
const access = require("../controllers/access.controller.js");
const ownerStock = require("../controllers/ownerStock.controller");

const { authJwt } = require("../middleware");
const controller1 = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleware");


module.exports = app => {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  /////////////////////
  /////OWNERSTOCK//////
  /////////////////////

  // Create a new owner Stock
  router.post("/ownerStock/", ownerStock.create);

  //Get ownerStock by ownerId and ItemId
  router.get("/OSByOwnerAndDate/:ownerId/:itemId", ownerStock.getOSByOwnerAndItem);

   // Update a Item with id
   router.put("/ownerStock/:id", ownerStock.update);


  ////////////////
  /////CART//////
  ////////////////
  // Create a new Cart
  router.post("/cart/", [authJwt.verifyToken], cart.create);

  //update cart
  router.put("/cart/:id", cart.update);

  //get all carts by the date
  router.get("/cartByDate/", cart.findCartsByDate);

  //get all carts
  router.get("/cart/", cart.findAll);


  ////////////////
  /////CART DETAIL//////
  ////////////////
  // Create a new Cart Detail

  router.get("/cartDetailByCust/:id", cartDetail.findCartDetailByCust);

  // Create a new Cart Detail
  router.post("/cartDetail/", [authJwt.verifyToken, authJwt.isAdmin],cartDetail.create);

  // Update a cart Detail with id
  router.put("/cartDetail/:id", cartDetail.update);


  ////////////////
  /////BRNAD//////
  ////////////////
  // Create a new Brand
  router.post("/brand/",[authJwt.verifyToken,authJwt.isAdmin,authJwt.checkScreenAccess], brand.create);

  // Retrieve all Brand
  router.get("/brand/",[authJwt.verifyToken,authJwt.isAdmin,authJwt.checkScreenAccess],brand.findAll);

  // Update a Brand with id
  router.put("/brand/:id", brand.update);

  ////////////////
  ////CATEGORY////
  ////////////////
  // Create a new Category
  router.post("/Category/", [authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess], category.create);

  // Retrieve all Category
  router.get("/Category/", category.findAll);

  // Update a Category with id
  router.put("/Category/:id", category.update);

  ////////////////
  //SUB CATEGORY//
  ////////////////
  // Create a new SubCategory
  router.post("/subCategory/", [authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess], subcategory.create);

  // Retrieve all SubCategory
  router.get("/subCategory/", [authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess], subcategory.findAll);

  // Update a SubCategory with id
  router.put("/subCategory/:id", subcategory.update);

  // Retrieve all sub cat under the cat id send as parameter
  router.get("/subCategory/:id", subcategory.findSubCatUnderCat);


  ////////////////
  //////ITEM//////
  ////////////////
 


  // Create a new Item
  router.post("/item/",[authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess], item.create);

  // Retrieve specific Item
  router.get("/item/:id", item.findOne);

  // Retrieve all Item
  router.get("/item/",[authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess], item.findAll);

  // Retrieve all Purchase Item
  router.get("/itemPurchaseHistory/:itemId", item.purchaseHistory);

  // Retrieve all Sale Item
  router.get("/itemSaleHistory/:itemId", item.saleHistory);

  // Retive all return Item
  router.get("/itemReturnHistory/:itemId", item.returnHistory);

  // Retive all Item within higher and lower limit
  router.get("/itemLimitReport/", item.limitReport);

  // get all  item sale trend by given date summary
  router.get("/itemTrend/:sDate/:eDate", item.sellingItemTrend);

  // get all  item sale purchase by given date
  router.get("/itemSalePurchaseDateWise/:sDate/:eDate", item.ItemSalePurchaseDateWise);


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
  router.post("/user/", [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    authJwt.verifyToken,
    authJwt.isAdmin], user.create);

// Create a online customer new User without JWT verification
router.post("/createOnlineCustomer/", [verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted], user.create);

// Verify an online customer new User without JWT verification
router.post("/verifyOnlineCust/", user.verifyCust);

  // Retrieve all Item
  router.get("/user/", user.findAll);

  // Retrieve specific User
  router.get("/user/:id", user.findOne);

  // Update a Item with id
  router.put("/user/:id", user.update);

  // Create a new Role
  router.post("/role/", [authJwt.verifyToken, authJwt.isAdmin], role.create);

  // Retrieve all Role
  router.get("/role/", role.findAll);

  // Retrieve access rights for the specific Role
  router.get("/roleAccess/:id", access.findAccessByRole);

  // Update role access rights
  router.put("/updateRoleAccess/:id", access.updateRoleAccess);


  // Create a new Role
  router.post("/userRole/", [authJwt.verifyToken, authJwt.isAdmin], userRole.create);


  // Create a new Role
  router.post("/userRoleOnline/",userRole.create);


  // Update user Role
  router.put("/userRole/:id", userRole.update);





  ////////////////
  ////PURCHASE////
  /////////////////
  // Create a new Purchase
  router.post("/purchase/", [authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess], purchase.create);

  // Retrieve all Purchase
  router.get("/purchase/", purchase.findAll);

  // Retrieve all Purchase Account Payable
  router.get("/purchaseAP/", [authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess],purchase.findAllAP);

  // Delete Purchase with purchase id
  router.delete("/purchase/:id", purchase.delete);


  // get all Purchase by given date
  router.get("/purchaseByDate/:sDate/:eDate/:customerId", purchase.findAllByDate);

  // get all Sale by given date summary
  router.get("/purchaseByDateSummary/:sDate/:eDate", purchase.findAllByDateSummary);


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
  router.post("/purchaseDetail/", [authJwt.verifyToken, authJwt.isAdmin], purchasedetail.create);

  // Retrieve all Purchase Details based on the purchase invoice id
  router.get("/purchaseDetailById/:id", purchasedetail.findById);

  // Retrieve all Purchase
  router.get("/purchaseDetail/", purchasedetail.findAll);

  // get latest purchse by item id
  router.get("/purchaseByLatestDate/:itemId", purchasedetail.findlatestPurchse);

  //UpdatePurchaseDetail
  router.put("/UpdatePurchaseDetail/:id",[authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess],purchasedetail.update);

  // Delete purchase Detail with purchase invoice id
  router.delete("/PurchaseDetailByPurchaseId/:id", purchasedetail.deleteByPurchaseInvoice);

  // Delete Purchase Detail with sale detail id
  router.delete("/purchaseDetail/:id", purchasedetail.delete);

  ////////////////////////////////
  ////Purchase Invoice Payment////
  ////////////////////////////////

  router.post("/createPurchaseInvPay/", purchasePayment.create);

  // Retrieve purchase invoice payment based on the sale invoice id
  router.get("/purchaseInvPay/:id", purchasePayment.findAllByReffId);

  ////////////////////////
  ////Edit Sale Record////
  ///////////////////////
  // Create a edit Sale
  router.post("/editSale/", saleEdit.create);

  // get all Sale by given date
  router.get("/editSale/:sDate/:eDate/:itemId/:invoiceId", saleEdit.findAllEditSale);

  ////////////////////////
  ////Edit Purchase Record////
  ///////////////////////
  // Create a edit Purchase
  router.post("/editPurchase/", purchaseEdit.create);

  // get all Sale by given date
  router.get("/editPurchase/:sDate/:eDate/:itemId/:invoiceId", purchaseEdit.findAllEditPurchase);


  ////////////////////
  ////Sale Inovice////
  ///////////////////
  // Create a new Sale
  router.post("/sale/", [authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess], sale.create);

  // Retrieve sale by its ID
  router.get("/sale/:id", sale.findOne);

  // Retrieve all Sale
  router.get("/sale/", sale.findAll);

  // Delete Sale with sale id
  router.delete("/sale/:id", sale.delete);

  // Retrieve all Sale Account Recievable
  router.get("/saleAR/",[authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess],sale.findAllAR);

  // Retrieve Sale Account Recievable By InvoiceId
  router.get("/saleARByInvoiceId/:id", sale.findARByInvoiceId);

  // Recalculate the Sale based on the invoice ID
  router.put("/getSaleRecalculate/:id", sale.getSaleRecalculate);

  //Retrive Sale invoice for given customer
  router.get("/saleByCustId/:id", sale.findAllByCustId);

  // get all Sale by given date
  router.get("/SaleByDate/:sDate/:eDate/:customerId/:agentId/:itemId/:invoiceId", sale.findAllByDateProfit);

  // get all Sale by given date summary
  router.get("/saleByDateSummary/:sDate/:eDate", sale.findAllByDateSummary);

   // get monthly sale
   router.get("/saleMonthly/:sDate/:eDate", sale.getMonthlySale);

   // get sale agent trend
   router.get("/saleAgentTrend/:sDate/:eDate", sale.getSaleAgentTrend);

    // get sale agent closed invoices 
    router.get("/saleAgentClosedInvoices/:sDate/:eDate", sale.getSaleAgentClosedInvoices);

  // get latest sale for the customer by item id
  router.get("/saleByLatestDate/:itemId/:customerId", sale.findlatestSale);

  
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
  router.post("/saleDetail/", [authJwt.verifyToken, authJwt.isAdmin], saledetail.create);
  //router.post("/saleDetail/:id", saledetail.create);
  // Retrieve all sale
  router.get("/saleDetail/:id", saledetail.findAll);

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
  router.post("/saleReturn/", [authJwt.verifyToken, authJwt.isAdmin,authJwt.checkScreenAccess], saleReturn.create);

  // get all Sale Return by given date
  router.get("/saleReturnByDate/:custName/:sDate/:eDate", saleReturn.findSaleReturnByDate);

//getSaleReturnDetailByInvoice
router.get("/saleReturnDetailByInvoice/:id", saleReturn.findSaleReturnDetailByInvoice);

  ////////////////////////////
  ////SALE Invoice Payment////
  ///////////////////////////

  // Create a new sale payment
  router.post("/createSaleInvPay/", salePayment.create);

  // Retrieve sale invoice payment based on the sale invoice id
  router.get("/saleInvPay/:id", salePayment.findAllByReffId);

  // Retrieve sale payment history of the customer
  router.get("/salePayHist/:id", salePayment.findPayHist);


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

   // item count daily report invoice wise as per manual daily sheet by N & A
   router.get("/itemCountDailyReport/:sDate/:eDate", report.getItemCountDailyReport);

  // get Total Inventory value
  router.get("/getTotalInv/", report.getInv);

   //Get Invetory mismatch base on sale - purchase != quantity in the stock
   router.get("/inventoryMismatch/",report.getInventoryMismatch);

  //get sale Sale Detail mismatch incase if both are not matching
  router.get("/saleSaleDetailMismatch/",report.getSaleSaleDetailMismatch);





  ////////////////
  //CashFlow//
  ////////////////
  // Create a new Cash flow entry
  router.post("/createCashFlow", cashFlow.create);

   // Retrieve all cash flow Account Recievable
   router.get("/cashFlow/:mode", cashFlow.findAll);

   // Create payment for the cash Flow record
   router.post("/createCashFlowPay/", cashFlowPayment.create);

   // Update a Cash Flow with id
  router.put("/updateCashFlow/:id", cashFlow.update);

  // Retrieve cash flow payment based on the cash flow id
  router.get("/cashFlowPay/:id", cashFlowPayment.findAllByReffId);


  ////////////////
  //InvDegub/////
  ////////////////
  // Create a new Inv Debug entry
  router.post("/createInvDebug/", invDebug.create);

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