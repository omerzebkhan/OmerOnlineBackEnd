require('dotenv').config();
var Host = "";
var User = "";
var Pass = "";
var DB = "";
var Dialet = "";

if (process.env.REACT_APP_LOCALSERVER==="True"){
  Host = "localhost";
  User = "postgres";
  Pass = "omer";
  Db = "testdb";
  Dialet = "postgres"; 
}
else {
  Host = "ec2-67-202-21-6.compute-1.amazonaws.com";
  User = "axenkmmmnrffnc";
  Pass = "d6549961c432a46605c023c80903b7ccac70040091059484708dbe29ea1534ba";
  Db = "da9hhbf5iglnut";
  Dialet = "postgres"; 

}
;


module.exports = {


  //////////// Remote heruko DB
  HOST: "ec2-67-202-21-6.compute-1.amazonaws.com",
  USER: "axenkmmmnrffnc",
  PASSWORD: "d6549961c432a46605c023c80903b7ccac70040091059484708dbe29ea1534ba",
  DB: "da9hhbf5iglnut",
  dialect: "postgres",
  ////////////////local DB
  // HOST : "localhost",
  // USER : "postgres",
  // PASSWORD : "omer",
  // DB : "testdb",
  // dialect : "postgres", 
  pool: {
    max: 5, //max: maximum number of connection in pool
    min: 0, //min: minimum number of connection in pool
    acquire: 30000, //idle: maximum time, in milliseconds, that a connection can be idle before being released
    idle: 10000 //acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
  }
};