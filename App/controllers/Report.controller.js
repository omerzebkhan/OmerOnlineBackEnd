const db = require("../models");
const Sale = db.sales;
const Op = db.Sequelize.Op;

exports.findBalanceSheet = async (req, res) => {
    const allDates = [];
    const sumSale = await db.sequelize.query('SELECT TO_CHAR("createdAt",\'dd/mm/yyyy\') date,sum(quantity*price) "InvoiceValue",sum((price-cost)*quantity) profit from "saleDetails" WHERE "createdAt" between (:startDate) and (:endDate) group by TO_CHAR("createdAt",\'dd/mm/yyyy\') ', {
        replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
        type: db.sequelize.QueryTypes.SELECT
      });
    
     // console.log(sumSale)
      sumSale.map((i)=>{
          allDates.push(i.date)
      })

      
      const sumPurchase = await db.sequelize.query('SELECT sum(invoicevalue),TO_CHAR("createdAt",\'dd/mm/yyyy\') date FROM "purchases" WHERE "createdAt" between (:startDate) and (:endDate) group by TO_CHAR("createdAt",\'dd/mm/yyyy\') ', {
        replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
        type: db.sequelize.QueryTypes.SELECT
      });
     // console.log(sumPurchase)
      
      sumPurchase.map((i)=>{
          var found ="False"
          allDates.map((ii)=>{
              if (i.date === ii)
              {found = "True"}
          })
          if (found ==="False")
          {allDates.push(i.date)}
      })

      const sumExpense = await db.sequelize.query('SELECT sum(amount) ,TO_CHAR("expensedate",\'dd/mm/yyyy\') date FROM "expenses" WHERE "expensedate" between (:startDate) and (:endDate) group by TO_CHAR("expensedate",\'dd/mm/yyyy\') ', {
        replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
        type: db.sequelize.QueryTypes.SELECT
      });
      //console.log(sumExpense)
      
      sumExpense.map((i)=>{
          var found ="False"
          allDates.map((ii)=>{
              if (i.date === ii)
              {found = "True"}
          })
          if (found ==="False")
          {allDates.push(i.date)}
      })

    const sumPurchasePayment = await db.sequelize.query('SELECT sum("cashPayment") "sumCashPay",sum("bankPayment") "sumBankPay",TO_CHAR("createdAt",\'dd/mm/yyyy\') date FROM "purchaseInvoicePayments" WHERE "createdAt" between (:startDate) and (:endDate) group by TO_CHAR("createdAt",\'dd/mm/yyyy\') ', {
        replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
        type: db.sequelize.QueryTypes.SELECT
      });
      console.log(sumPurchasePayment)
      
      sumPurchasePayment.map((i)=>{
          var found ="False"
          allDates.map((ii)=>{
              if (i.date === ii)
              {found = "True"}
          })
          if (found ==="False")
          {allDates.push(i.date)}
      })


    const sumSalePayment = await db.sequelize.query('SELECT sum("cashPayment") "sumCashPay",sum("bankPayment") "sumBankPay",TO_CHAR("createdAt",\'dd/mm/yyyy\') date FROM "saleInvoicePayments" WHERE "createdAt" between (:startDate) and (:endDate) group by TO_CHAR("createdAt",\'dd/mm/yyyy\') ', {
        replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
        type: db.sequelize.QueryTypes.SELECT
      });
      console.log(sumSalePayment)
      
      sumSalePayment.map((i)=>{
          var found ="False"
          allDates.map((ii)=>{
              if (i.date === ii)
              {found = "True"}
          })
          if (found ==="False")
          {allDates.push(i.date)}
      })


    console.log(`printing Dates ${allDates}`);
      var finalRes = []
      allDates.map((i)=>{
        const obj = {}
        obj.date = i;

        const ss = sumSale.filter(sale => sale.date === i);
        //console.log(`printing sumSale ${ss}`)
        obj.totalSale = ss.length>0 ? ss[0].InvoiceValue:0;
        obj.totalProfit = ss.length>0 ? ss[0].profit:0;
       
        const sp = sumPurchase.filter(purchase => purchase.date === i);
        //console.log(sp)
        obj.totalPurchase = sp.length>0 ?sp[0].sum:0;

        const se = sumExpense.filter(expense => expense.date === i);
        obj.totalExpense = se.length>0 ? se[0].sum:0;

        const spp = sumPurchasePayment.filter(purchasePayment => purchasePayment.date === i);
        obj.totalCashPaid = spp.length>0 ? spp[0].sumCashPay:0;
        obj.totalBankPaid = spp.length>0 ? spp[0].sumBankPay:0;     
        

        const ssp = sumSalePayment.filter(salePayment => salePayment.date === i);
        obj.totalCashReceived = ssp.length>0 ? ssp[0].sumCashPay:0;
        obj.totalBankReceived = ssp.length>0 ? ssp[0].sumBankPay:0;


        finalRes.push(obj)
        

      })
      
      
     

      finalRes.map((item)=>{
          console.log(`date = ${item.date} 
          total Sale = ${item.totalSale} 
          total Purchase = ${item.totalPurchase}
          `)
      })
    
    return res.status(200).json(finalRes)

      
  };

exports.getInv = async (req,res)=>{
  const totalInv = await db.sequelize.query(
    `select sum(quantity) from items;`
    , {
    type: db.sequelize.QueryTypes.SELECT
  });


  return res.status(200).json(totalInv)
}

exports.getInventoryMismatch = async (req,res)=>{
  const totalInv = await db.sequelize.query(
    `select items.id,items.name,quantity,pur.totalpurchase,sales.totalsale,quantity-(sales.totalsale-pur.totalpurchase) as diff
    from items
    Join (
    select "itemId",sum(quantity) as totalsale 
    from "saleDetails"
    group by "itemId") as sales on items.id =sales."itemId"
    Join(
    select "itemId",sum(quantity) as totalpurchase
    from "purchaseDetails"
    group by "itemId") as pur on items.id=pur."itemId"
    where quantity!=pur.totalpurchase-sales.totalsale;`
    , {
    type: db.sequelize.QueryTypes.SELECT
  });


  return res.status(200).json(totalInv)
}


exports.getSaleSaleDetailMismatch = async (req,res)=>{
  const data = await db.sequelize.query(
    `select sales.id,invoicevalue,sum("saleDetails".quantity*"saleDetails".price) as saledetailtotal
    from sales,"saleDetails"
    where sales.id = "saleDetails"."saleInvoiceId"
    group by sales.id
    having  invoicevalue != sum("saleDetails".quantity*"saleDetails".price)
    order by sales.id desc;`
    , {
    type: db.sequelize.QueryTypes.SELECT
  });


  return res.status(200).json(data)
}

exports.getItemCountDailyReport = async (req, res) => {
  const allDates = [];
  const saleItemCount = await db.sequelize.query('SELECT TO_CHAR("createdAt",\'dd/mm/yyyy hh24:MI:SS\') date,id,totalitems from "sales" WHERE "createdAt" between (:startDate) and (:endDate) ', {
      replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
      type: db.sequelize.QueryTypes.SELECT
    });
  
   // console.log(sumSale)
   saleItemCount.map((i)=>{
        allDates.push(i.date)
    })

    
    const purchaseItemCount= await db.sequelize.query('SELECT TO_CHAR("createdAt",\'dd/mm/yyyy hh24:MI:SS\') date,id,totalitems FROM "purchases" WHERE "createdAt" between (:startDate) and (:endDate) ', {
      replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
      type: db.sequelize.QueryTypes.SELECT
    });
   // console.log(sumPurchase)
    
   purchaseItemCount.map((i)=>{
        var found ="False"
        allDates.map((ii)=>{
            if (i.date === ii)
            {found = "True"}
        })
        if (found ==="False")
        {allDates.push(i.date)}
    })

    const editSaleItemCount= await db.sequelize.query(`SELECT TO_CHAR("createdAt",'dd/mm/yyyy hh24:MI:SS') date,saleinvoiceid,sum(oldqty-newqty) as totalitems 
    from "editSales" WHERE "createdAt" between (:startDate) and (:endDate) 
    group by TO_CHAR("createdAt",'dd/mm/yyyy'),saleinvoiceid`, {
      replacements: {startDate: req.params.sDate,endDate:req.params.eDate},
      type: db.sequelize.QueryTypes.SELECT
    });
   // console.log(sumPurchase)
    
   editSaleItemCount.map((i)=>{
        var found ="False"
        allDates.map((ii)=>{
            if (i.date === ii)
            {found = "True"}
        })
        if (found ==="False")
        {allDates.push(i.date)}
    })
    
  
  console.log(`printing Dates ${allDates}`);
    var finalRes = []
    allDates.map((i)=>{
      const obj = {}
      obj.date = i;

      const ss = saleItemCount.filter(sale => sale.date === i);
      //console.log(`printing sumSale ${ss}`)
      obj.saleid = ss.length>0 ? ss[0].id:0;
      obj.saleitem = ss.length>0 ? ss[0].totalitems:0;
     
      const sp = purchaseItemCount.filter(purchase => purchase.date === i);
      //console.log(sp)
      obj.purchaseid = sp.length>0 ?sp[0].id:0;
      obj.purchaseitem = sp.length>0 ?sp[0].totalitems:0;

      const es = editSaleItemCount.filter(editSale => editSale.date === i);
      //console.log(sp)
      obj.editsaleid = es.length>0 ?es[0].saleinvoiceid:0;
      obj.editsaleitem = es.length>0 ?es[0].totalitems:0;

      finalRes.push(obj)
      

    })
    
    
   

    finalRes.map((item)=>{
        console.log(`date = ${item.date} 
        total Sale = ${item.totalSale} 
        total Purchase = ${item.totalPurchase}
        `)
    })
  
  return res.status(200).json(finalRes)

    
};