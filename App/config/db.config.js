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
  //Host = "ec2-67-202-21-6.compute-1.amazonaws.com";
  // User = "axenkmmmnrffnc";
  // Pass = "d6549961c432a46605c023c80903b7ccac70040091059484708dbe29ea1534ba";
  // Db = "da9hhbf5iglnut";
  // Dialet = "postgres"; 

  // Host = "ec2-52-3-60-53.compute-1.amazonaws.com";
  // User = "vhfrkametazjdk";
  // Pass = "772da0e515b0829fc25faca16d0bc17ee91095e793e57ffba930a797ed54fb8b";
  // Db = "d40cas9scuggao";
  // Dialet = "postgres"; 

}
;


module.exports = {

  //////////// Remote heruko DB omerwholesale   port 5342

  // HOST:"ec2-34-206-106-3.compute-1.amazonaws.com",
  // USER:"iewpjpohuilezs",
  // PASSWORD:"2312ee47cf68f67fc259ce1325d4a0346a0f32dcbabe2de2c7ac289a264b03a8",
  // DB:"d5h5rl31efk32a",
  // dialect:"postgres",

  //////////// Remote heruko DB N&M  port 5342
  HOST: "ec2-52-3-60-53.compute-1.amazonaws.com",
  USER: "vhfrkametazjdk",
  PASSWORD: "772da0e515b0829fc25faca16d0bc17ee91095e793e57ffba930a797ed54fb8b",
  DB: "d40cas9scuggao",
  dialect: "postgres",

  ////////////////local DB  N&A Traders
  // HOST : "localhost",
  // USER : "postgres",
  // PASSWORD : "omer",
  // DB : "pakBusinessDB",
  // dialect : "postgres",
  
  ////////////////local DB Test
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