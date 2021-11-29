-----------------------------------item reset------------------------------
select * from items;
update items set quantity =0,online=0,showroom=0,warehouse=0,averageprice=0;

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






-- Table: public.user_roles

-- DROP TABLE public.user_roles;

CREATE TABLE public.user_roles
(
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "roleId" integer NOT NULL,
    "userId" integer NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY ("roleId", "userId"),
    CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId")
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.user_roles
    OWNER to postgres;
	
	
	
	
	-- Table: public.roles

-- DROP TABLE public.roles;

CREATE TABLE public.roles
(
    id integer NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT roles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.roles
    OWNER to postgres;



CREATE TABLE public."roleAccess"
(
    id integer,
    "roleId" integer,
    "screenName" character(255),
    status boolean
);

ALTER TABLE public."roleAccess"
    OWNER to postgres;
	
	
INSERT INTO public."accesses"
	VALUES (22, 6, 'Add Expense', true, '2021-09-07 20:11:44.559+03','2021-09-07 20:11:44.559+03');
	
	
	select * from user_roles_id_seq
	
	select currval('user_roles_id_seq')
	
	select nextval('user_roles_id_seq')
	
	
	
	
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
-------------------Create Default Roles--------------------
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
	
--------------------Assign role to the created user --------------------------------------
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
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (10, 1,'Sale Invoice','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');"
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (11, 1,'Sale Return','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (12, 1,'Pricing','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (13, 1,'Account Receivable','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (14, 1,'Account Payable','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (15, 1,'Add User','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (16, 1,'Update Access','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (17, 1,'Add Role','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (18, 1,'Update Access','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');
INSERT INTO accesses(id, "roleId", "screenName", status, "createdAt", "updatedAt")VALUES (19, 1,'Add Expense','true', '2021-09-07 20:11:44.559+03', '2021-09-07 20:11:44.559+03');

	