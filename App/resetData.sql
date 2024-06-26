-----------------------------------item reset------------------------------
select * from items;

update items set quantity =0,online=0,showroom=0,warehouse=0,averageprice=0,onlineprice=0,showroomprice=0,onlinediscount=0 where id > 744;

----------------------------------User reset-------------------------------
update users set totalamount =0,outstanding=0;
---------------------------------Sale reset--------------------------------
delete from "sales"
delete from "saleDetails"
delete from "saleInvoicePayments"
delete from "saleInvoicePayments"
---------------------------------Purchase reset------------------------------
delete from "purchases"
delete from "purchaseDetails"

ALTER TABLE users
ADD COLUMN password character varying(255);

ALTER TABLE users
ADD COLUMN otp character varying(255);

ALTER TABLE users
ADD COLUMN status character varying(255);


--------------------------------------Roles-------------------------------------



---------------------------------------users------------------------------------
----------------admin users
INSERT INTO public.users(
	id, name, address, mobile, email, ph, role, description, totalamount, outstanding, comments, "createdAt", "updatedAt", username, password)
	VALUES (8, 'omer', 'kuwait', '99111074', 'omerzeb@hotmail.com',
			'99111074', '', 'Admin User',null, null, null, '2021-09-21 21:10:49.882+03', '2021-09-21 21:10:49.882+03', 'omerzeb','$2a$08$Wp4LbTwuxOIfwxf9mrGpROn0Dgf1IX2VvsVV2PXRMejc858DbnmUC');
	
user id = 8
role id = 6

select * from user_roles

insert into user_roles values ('2021-09-21 21:10:49.924+03','2021-09-21 21:10:49.924+03',6,8)



INSERT INTO public.users(
	id, name, address, mobile, email, ph, role, description, totalamount, outstanding, comments, "createdAt", "updatedAt", username, password)
	VALUES (9, 'purchase Agnet', 'kuwait', '9999999', 'pa@hotmail.com',
			'99111074', '', 'Purchase Agent',null, null, null, '2021-09-21 21:10:49.882+03', '2021-09-21 21:10:49.882+03', 'pagent','$2a$08$Wp4LbTwuxOIfwxf9mrGpROn0Dgf1IX2VvsVV2PXRMejc858DbnmUC');
	
insert into user_roles values ('2021-09-21 21:10:49.924+03','2021-09-21 21:10:49.924+03',7,9)


-----------------------------------------Passwords---------
$2a$08$szIjLpoTvzl9gtCJ0bB1iuCEOtO.xms3t2F9wMC5bzpWtDu1nfXFG  =1
$2a$08$Y1oMrgOfnnCKlfufCi4znOOwa5L8u4uKl5mL6XjfLY1He9/GwAkv.  =NabeelB@hi
$2a$08$9Lq4bvZQaozpC0I2/M2r3egehTKNWGuDu9D1hlx9/5W8/yfTyl0l2  = (Nabeel Rasheed old password)

INSERT INTO public."accesses" VALUES (22, 6, 'Add Expense', true, '2021-09-07 20:11:44.559+03','2021-09-07 20:11:44.559+03');


	
	SELECT * FROM information_schema.sequences;
	
	select * from user_roles_id_seq
	
-------react dynamic element attributes------
{...selectedUser ? 
                            {value:name,onChange:handleChange} :
                            {value:name,onChange:handleChange} 
                       
                        }
	

 { ...process.env.REACT_APP_S3 === "True" ?
      {src:{item.imageUrl},alt:"no data",width=:"100",height:"100"}
      :
      {src:{`${process.env.REACT_APP_MIDDLEWARE}/itemsImages/${item.imageUrl}`},alt:"no data",width:"100",height="100"}
	  }
                                            }


--------------------------------------------psql commands-------------------------------------------
----Create Default Roles--------------------
INSERT INTO roles(id, name, "createdAt", "updatedAt")VALUES (1, 'admin','2021-09-21 21:10:49.882+03', '2021-09-21 21:10:49.882+03');
INSERT INTO roles(id, name, "createdAt", "updatedAt")VALUES (2, 'saleAgent','2021-09-21 21:10:49.882+03', '2021-09-21 21:10:49.882+03');	
INSERT INTO roles(id, name, "createdAt", "updatedAt")VALUES (3, 'purchaseAgent','2021-09-21 21:10:49.882+03', '2021-09-21 21:10:49.882+03');
INSERT INTO roles(id, name, "createdAt", "updatedAt")VALUES (4, 'customer','2021-09-21 21:10:49.882+03', '2021-09-21 21:10:49.882+03');
INSERT INTO roles(id, name, "createdAt", "updatedAt")VALUES (5, 'onlineCustomer','2021-09-21 21:10:49.882+03', '2021-09-21 21:10:49.882+03');
INSERT INTO roles(id, name, "createdAt", "updatedAt")VALUES (6, 'supplier','2021-09-21 21:10:49.882+03', '2021-09-21 21:10:49.882+03');

-------------------Create users with default password 123456789------------------------------------
INSERT INTO users(
	id, name, address, mobile, email, ph,description, totalamount, outstanding, comments, "createdAt", "updatedAt", username, password)
	VALUES (1,'omerzeb','kuwait',99111074,'omerzeb@hotmail.com', 99111074, 'Admin user', 0, 0, '', '2021-09-21 21:10:49.882+03','2021-09-21 21:10:49.882+03','omerzeb', '$2a$08$Wp4LbTwuxOIfwxf9mrGpROn0Dgf1IX2VvsVV2PXRMejc858DbnmUC');
	
--Assign role to the created user admin = 1--------------------------------------
INSERT INTO user_roles(id, "roleId", "userId", "createdAt", "updatedAt") VALUES (1, 1, 1,'2021-09-21 21:10:49.882+03','2021-09-21 21:10:49.882+03');


----------------------------Assign all rights to the user -----------------------------
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (1, 1,'Search item','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (2, 1,'Add item','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (3, 1,'Add Brand','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (4, 1,'Search Brand','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (5, 1,'Add Category','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (6, 1,'Add subCategory','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (7, 1,'Search subCategory','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (8, 1,'Purchase Invoice','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (9, 1,'Move Stock','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (10, 1,'Sale Invoice','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (11, 1,'Sale Return','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (12, 1,'Pricing','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (13, 1,'Account Receivable','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (14, 1,'Account Payable','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (15, 1,'Add User','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (16, 1,'Update Access','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (17, 1,'Add Role','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (18, 1,'Update Access','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (19, 1,'Add Expense','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');

---------------------------------Actuvate user id =1
update users set status = 'Active' where id = 1

--------------------Create Test customer -------------------------------
INSERT INTO users(
	id, name, address, mobile, email, ph,description, totalamount, outstanding, comments, "createdAt", "updatedAt", username, password)
	VALUES (2,'test customer','kuwait',99111074,'tc@h.com', 99111074, 'Customer ', 0, 0, '', '2021-09-21 21:10:49.882+03','2021-09-21 21:10:49.882+03','testcustomer', '$2a$08$Wp4LbTwuxOIfwxf9mrGpROn0Dgf1IX2VvsVV2PXRMejc858DbnmUC');

--Assign role to the created customer id =4 --------------------------------------
INSERT INTO user_roles(id, "roleId", "userId", "createdAt", "updatedAt") VALUES (2, 4, 2,'2021-09-21 21:10:49.882+03','2021-09-21 21:10:49.882+03');


--------------------Create Test Sale Agent -----------------------------------
INSERT INTO users(
	id, name, address, mobile, email, ph,description, totalamount, outstanding, comments, "createdAt", "updatedAt", username, password)
	VALUES (3,'test Agent','kuwait',99111074,'tsa@h.com', 99111074, 'Agent', 0, 0, '', '2021-09-21 21:10:49.882+03','2021-09-21 21:10:49.882+03','testagent', '$2a$08$Wp4LbTwuxOIfwxf9mrGpROn0Dgf1IX2VvsVV2PXRMejc858DbnmUC');

--Assign role to the created Agent id =2 --------------------------------------
INSERT INTO user_roles(id, "roleId", "userId", "createdAt", "updatedAt") VALUES (3, 2, 1,'2021-09-21 21:10:49.882+03','2021-09-21 21:10:49.882+03');

-----------------------Create Test supplier -------------------------------------

INSERT INTO users(
	id, name, address, mobile, email, ph,description, totalamount, outstanding, comments, "createdAt", "updatedAt", username, password)
	VALUES (4,'test Supplier','kuwait',99111074,'ts@h.com', 99111074, 'Supplier', 0, 0, '', '2021-09-21 21:10:49.882+03','2021-09-21 21:10:49.882+03','testsupplier', '$2a$08$Wp4LbTwuxOIfwxf9mrGpROn0Dgf1IX2VvsVV2PXRMejc858DbnmUC');

--Assign role to the created Agent id =6 --------------------------------------
INSERT INTO user_roles(id, "roleId", "userId", "createdAt", "updatedAt") VALUES (3, 6, 1,'2021-09-21 21:10:49.882+03','2021-09-21 21:10:49.882+03');


--------------------------------view and update sequence----------------------------------
select currval('items_id_seq')
	
	select nextval('user_roles_id_seq')
	
	ALTER SEQUENCE user_roles_id_seq RESTART WITH 313;
	
	SELECT SETVAL('users_id_seq', (SELECT MAX(id) FROM users));
	SELECT SETVAL('brands_id_seq', (SELECT MAX(id) FROM brands));
	SELECT SETVAL('categories_id_seq', (SELECT MAX(id) FROM categories));
	SELECT SETVAL('subcategories_id_seq', (SELECT MAX(id) FROM subcategories));
	SELECT SETVAL('items_id_seq', (SELECT MAX(id) FROM items));
	SELECT SETVAL('user_roles_id_seq', (SELECT MAX(id) FROM user_roles));
	SELECT SETVAL('user_roles_id_seq', (SELECT MAX(id) FROM user_roles));
	
	select currval ('saleInvoicePayments_seq_id_seq')
	
	
	
	
	
	
---------------------------------heruko plan-------------------------------------------	

heruko hosting plan / Purchasing domain will be seperate

DB hobby basic = 9 $ per month = 2.25 dinar = 2 K Rs
app            = 7 $ per month = 1.75 dinar = 1 K Rs




select TO_CHAR("createdAt",'dd/mm/yyyy') "date","saleInvoiceId",sum("itemId") TotalItems,sum("quantity") Quantity,sum("price") Price,sum("cost") "Cost",sum((price-cost)*quantity) profit
from "saleDetails"
group by TO_CHAR("createdAt",'dd/mm/yyyy'),"saleInvoiceId";

-----------------------Update the sale

update sales set totalitems = (select sum(quantity) from "saleDetails" where "saleInvoiceId" = 1), invoicevalue = (select sum(price*quantity) from "saleDetails" where "saleInvoiceId" = 1),"Outstanding" = (select sum(price*quantity) from "saleDetails" where "saleInvoiceId" = 1) where id = 1;



-----------------------to verify the total amount of user, sale ,saleDetails
select * from (
select id,sum(totalamount) "userTotalAmount",sum(outstanding) "user Outstanding" from users group by id) a,
(select "customerId",sum(invoicevalue) "saleInvoiceValue",sum("Outstanding") "salesOutstanding" from sales group by "customerId") b,
(select "customerId",sum(price*quantity) from "saleDetails","sales" where "saleDetails"."saleInvoiceId" = sales.id group by "customerId") c
where a.id = b."customerId" and b."customerId"=c."customerId" and c."customerId"=2;

------------------------customer base view to get the total outstanding amount
select "customerId","name","address",sum(invoicevalue) "saleInvoiceValue",sum("Outstanding") "salesOutstanding" 
from sales,users where sales."customerId" = users.id group by "customerId","name","address";

---to get the purchase invoice details 
select * from purchases where id = 107;


--compare it withe the purchase invce details
select sum(quantity * price) from "purchaseDetails" where "purchaseInvoiceId"=107;

--if any difference found then update the valus in the following fields
update purchases set invoicevalue = 93036 where id = 107;

-------item query
select quantity,showroom from items where id=479;

update items set quantity =300 ,showroom=300 where id =479;



ALTER TABLE items
ADD COLUMN higherlimit character varying(255),
ADD COLUMN lowerlimit character varying(255),
;

ALTER TABLE sales
ADD COLUMN agentid character varying(255);

ALTER TABLE "saleInvoicePayments"
ADD COLUMN comments character varying(255);

ALTER TABLE cashFlow
ADD COLUMN outstanding FLOAT;

ALTER TABLE "cartDetails"
ADD COLUMN price FLOAT;

ALTER TABLE sales
ALTER COLUMN agentid TYPE INT 
USING agentid::integer;


ALTER TABLE saleDetails
ADD COLUMN srno integer;

ALTER TABLE items
ADD COLUMN investone integer;


alter table carts 
add column confirmtime  timestamp without time zone,
add column rtdtime timestamp without time zone,
add column deliveredtime timestamp without time zone,
add column feedback character varying(255);


--------------------------------------------------STOCK value with last purchase-----------------------------
	select items.id,items.name,items.code,items.description,items.quantity,items.showroom,items.averageprice,lp.price as lastpurchase
		from items,(
		select * from "purchaseDetails",(
	 select max("id") as id ,"itemId" as item from "purchaseDetails"
  group by "itemId") m
  where "purchaseDetails".id = m.id) lp
		where items.id = lp."itemId"
		and items.name like '%test%'
-------------------------------------------------------REPORTS
select ROUND(CAST(FLOAT8 (sum(invoicevalue)) AS NUMERIC),2) as totalSale,TO_CHAR("createdAt",'mm/yyyy') as month
  from sales 
  --"createdAt" between '${startedDate}' and '${endDate}'
  group by TO_CHAR("createdAt",'mm/yyyy')
  order by TO_CHAR("createdAt",'mm/yyyy') desc
  
  
  select * from sales
  
  select ROUND(CAST(FLOAT8 (sum(price*quantity)) AS NUMERIC),2) as totalSale,ROUND(CAST(FLOAT8 (sum(quantity)) AS NUMERIC),2) as totalItem,ROUND(CAST(FLOAT8 (sum((price-cost)*quantity)) AS NUMERIC),2) as profit,TO_CHAR("createdAt",'mm/yyyy') as month
  from "saleDetails"
  --"createdAt" between '${startedDate}' and '${endDate}'
  group by TO_CHAR("createdAt",'mm/yyyy')
  order by TO_CHAR("createdAt",'mm/yyyy') desc
  
  
  select ROUND(CAST(FLOAT8 (sum(price*quantity)) AS NUMERIC),2) as totalSale,ROUND(CAST(FLOAT8 (sum(quantity)) AS NUMERIC),2) as totalItem,ROUND(CAST(FLOAT8 (sum((price-cost)*quantity)) AS NUMERIC),2) as profit,TO_CHAR("createdAt",'mm/yyyy') as month
  from "saleDetails"
  "createdAt" between '${startedDate}' and '${endDate}'
  group by TO_CHAR("createdAt",'mm/yyyy')
  order by TO_CHAR("createdAt",'mm/yyyy') desc
  

-------------------------------------------------Acount recievable between two dates

-----------------------------------------------Sale invoice profit with the last purchase value -----------------------

select "saleDetails".id,"saleDetails"."saleInvoiceId","saleDetails"."itemId","saleDetails".quantity,"saleDetails".price,"saleDetails".cost,
lp.price,
(("saleDetails".price-"saleDetails".cost)*"saleDetails".quantity) as "AvgProfit",
((lp.price-"saleDetails".cost)*"saleDetails".quantity) as "LastPurchaseProfit"
from "saleDetails",(select * from "purchaseDetails",(
	 select max("id") as id ,"itemId" as item from "purchaseDetails"
  group by "itemId") m
  where "purchaseDetails".id = m.id) lp
  where "saleDetails"."itemId" = lp."itemId"
  and "saleDetails"."saleInvoiceId"=29
  
  
  
------------------------------lower limit report------------------------------
select a.id,a.name,a.quantity,a.lowerlimit,a.higerlimit from items a,items b 
	where a.id = b.id
	and (a.quantity >= b.lowerlimit and a.quantity <= b.higherlimit)


---------------------------------top selling item -------------------------------

select coalesce(p.totalpurchase,null,0) as totalpurchase,
coalesce(s.totalsale,null,0) as totalsale,coalesce(s.saleprice,null,0) as saleprice,coalesce(s.cost,null,0) as cost,coalesce(s.profit,null,0) as profit,name,averageprice from 
--select count(*) from 
items
left outer join 
(select sum("saleDetails".quantity) as totalsale,sum(price)/count(*) as saleprice,sum(cost)/count(*) as cost ,sum(price)/count(*)-sum(cost)/count(*) as profit, "itemId"
from "saleDetails"
--where  "saleDetails"."createdAt" between '2022-04-20' and '2022-04-23'
group by "itemId"
) as s
on items.id = s."itemId"
left outer join 
(select sum("purchaseDetails".quantity) as totalpurchase,"itemId"
from "purchaseDetails"
--where  "purchaseDetails"."createdAt" between '2022-04-20' and '2022-04-23'
group by "itemId"
) as p on items.id = p."itemId"
order by s.totalsale asc;


---------------------------------------------------plsql----------------------------------------------------

do 
$$
declare
   film_count integer;
begin 
   select count(*) into film_count
   from users;
   raise notice 'The number of films: %', film_count;
end;
$$



do $$ 
declare
   created_at time := now();
begin 
   raise notice '%', created_at;
   perform pg_sleep(10);
   raise notice '%', created_at;
end $$;



do $$ 
declare
	titles text default '';
	rec_users  record;
	cur_users cursor 
		 for select id, name,address
		 from users;
begin 
    -- open the cursor
   open cur_users;
	
   loop
    -- fetch row into the film
      fetch cur_users into rec_users;
    -- exit when no more row to fetch
      exit when not found;

    -- build the output
      if rec_users.title like '%ful%' then 
         titles := titles || ',' || rec_users.name || ':' || rec_users.address;
      end if;
   end loop;
   --print the records
   raise notice 'The recoreds: %', titles;
  
   -- close the cursor
   close cur_films;
end $$;





do $$ 
declare
	titles text default '';
	rec_users  record;
	cur_users cursor 
		 for select name,address
		 from users where address is not null;
begin 
    -- open the cursor
   open cur_users;
	
   loop
    -- fetch row into the film
      fetch cur_users into rec_users;
    -- exit when no more row to fetch
     exit when not found;

    -- build the output
      --if rec_users.name like '%o%' then 
         titles := titles || ',' || rec_users.name || ':' || NULLIF(rec_users.address,' ');
      --end if;
   end loop;
   --print the records
   raise notice 'The recoreds: %', titles;
  
   -- close the cursor
   close cur_users;
end $$;




do $$ 
declare
	titles text default '';
	rec_users  record;
	current_stock = 100;
	cost = 0;
	qty = 0;
	cur_users cursor 
		 for select *
		 from "purchaseDetails" where "itemId"=1;
begin 
    -- open the cursor
   open cur_users;
	
   loop
    -- fetch row into the film
      fetch cur_users into rec_users;
    -- exit when no more row to fetch
     exit when not found;

    -- build the output
      --if rec_users.name like '%o%' then 
         titles := titles || e'\n' || rec_users."purchaseInvoiceId" || ':' || rec_users.quantity;
      --end if;
   end loop;
   --print the records
   raise notice 'The recoreds: %', titles;
  
   -- close the cursor
   close cur_users;
end $$;






----------------------------------------------------------------------------------------------------------------------------------------------------------
check the N&M sale details and find where the profit is zero.
these invoices will have issue because there sale was entered before purchase.
purchase invoice was edited after the sale 


there is a bug in sale / purchase invoice where u change the item code.

sale agent start end closing invoices outstanding if the total amount is cleared.
Sale invoice get halted when enter is pressed on the item selection.  
Edit purchase it should the vendor instead of customer.
add agent wise report report in gui
monthly sale report trend with the graph --In progress
add invoice wise search in the AR screen
create cash management table
	--Perosnal AR -- through cash or bank
	--Personal AP -- through cash or bank
AP screen should show the details of all the payment made by the user   .
account recievable if edited whole amount is comming back in outstanding   .....need to simulate this case in local setup
return item is updating the outsting to the same invoice value .................... test is working fine as per local test.
Done

edit the existing AP / AR invoices.
AR/Ap screen should show the invoice details also .................
Restricted Access for the sale agent.
add last purchase to the stock report
add errors of the api to the db if debug flag is true.    
area wise filter in sale report.
A/R sale return of the specific invoice.   
total edit report  (need to check what to show in this how to know how much amount is changed) (store old and new values in the edit table)
Add total return/return item qty/ purchase item qty/sale item qty in the balance sheet 

add connect error message on the screens
check error in the console when clicking payment details on AR screen

when adding new item in the purchase invoice edit option total invoice value is not getting updated.
need to find the issue in the edit purchase of the products.

add option which reviving payment if amount is neative (means has to pay it to the customer) list of invoice haivng outstanding so can be adjusted in one of them.


Making amritsare shopping center online system so that we will be able to make more branches ....?
agent access restriction.
deal calculation automatically
rates of products accuracy
change shop keeper name (double)
check why usually sum of ??
Daily actions does not match with 

expense should be added to the purchase invoice so builty expense can be added to the indivisual products cost.
balance sheet to manage the additional money which is paid to anyone (recieved + paided advance)

sale return product search.
AC /AP after refresh all invoice but it should show the same search of the customer.
customer details with credit & debit in one screen



-------------------------------Done By Nabeel----------------------------------------------
registery for the shop bahari colony

--------------------------------Pending on Nabeel-------------------------------------------
Add old history screen for the payments
Decide which item to put on the portal.
pic. of those item.
category of those item.
what should be look of our landing page (fist page customer will view)
how to manage payment e.g. cash on delivery ?
check with lawyer to make omer filer ?



lawyer update for the account
H#3 st# 14  Qabrastan road Wala transfer letter update
H#2 st#15 Apia wala (farooq bahi) transfer letter update
Ahamed bahi payment. (1 Lack left)






apperrors
id,userid,screenName,function,description,comments





Sales 

golden perl cream new  invest1 






to calculate the cost of an item
1- check the current stock value for the given date by sale - purchase till that day.
2- check the total of the invoice before the given day till it reach the stock value range calculate above and calculate the average cost by 
sum of the invoices cost / sum of the 




----------------------------------------update invest one stock in N&M account-------------------
select concat('update items set investone=',quantity,' where id =',id,';') from items;





-----------------------------------------DOCKER ------------------------------------------
Images: A docker image contains everything you need to run your application. It is a template that holds a set of instructions needed to create a working container.
Container: This is a running process/instance of an image. A docker container ‘contains’ everything your application needs to run and can run your application in any environment — as discussed above.
Dockerfile: A dockerfile is a blueprint/set of instructions that defines how your image is built. It is a series of steps that you have defined, and that must happen before your image is successfully built.
Docker hub: Think of Github. Docker hub is a registry that allows you to host your images and gives you access to a wide number of other docker images that you can pull and work with.
Dockerignore: The .dockerignore file acts like the .gitignore file. It contains any file in your local application that you do not want in your docker image.

npx create-react-app my-app-docker
cd my-app-docker
my-app-docker>npm start

--create a Dockerfile under the my-app-docker
FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]

--create .dockerignore file under the my-app-docker
node_modules
Dockerfile
.git

--create docker image
C:\D drive\frelance project\react js\my-app-docker>docker build -t my-app-docker:latest .

--Running our container
docker run --omerapp -d -p 3000:3000 my-app-docker:latest

-- list all the containers
docker container ls --all

--check logs of specific container 
docker logs d24459e9c422



docker container ls --all --format ‘{{ json . }}’ | python3 -m json.tool --json-lines   -- not working 

docker container ls --all --format ‘table {{ .Names }}/t{{ .Status }}/t{{ .Command }}’ --no-trunc


--


--------------------------------------responsive dynamic styled side bar------------------------------
https://dev.to/jealousgx/build-a-responsive-sidebar-with-react-and-styled-components-4e9e

------react shoping cart design
https://www.youtube.com/results?search_query=lama+dev


https://www.youtube.com/watch?v=c1xTDSIXit8
6:20



https://www.helpmegeek.com/deploy-reactjs-nodejs-app-windows/


--whats up message through the 
https://stackoverflow.com/questions/47243154/how-to-send-whatsapp-message-via-javascript

--docker container
https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application

--Send email through gmail account
https://jay315.medium.com/sending-email-using-express-js-with-nodemailer-in-heroku-71741f29463c

https://ciunkos.com/creating-contact-forms-with-nodemailer-and-react

https://javascript.plainenglish.io/create-otp-based-user-sign-up-using-node-js-cc4defc54123

https://stackoverflow.com/questions/25693280/nodemailer-with-gmail-service-not-working-on-heroku  --heroku for nodemailer-and-react


	

