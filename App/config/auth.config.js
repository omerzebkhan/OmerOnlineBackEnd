module.exports = {
    secret: "bezkoder-secret-key",
     jwtExpiration: 36000,           // 1 hour extra 0 added
     jwtRefreshExpiration: 86400,   // 24 hours
  
    /* for test */
   // jwtExpiration: 60,          // 1 minute
   // jwtRefreshExpiration: 120,  // 2 minutes
  };