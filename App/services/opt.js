const otpGenerator = require('otp-generator');
//const { OTP_LENGTH, OTP_CONFIG } = require('../constants/constants');
module.exports.generateOTP = () => {
  //const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  const OTP = otpGenerator.generate(5, {upperCaseAlphabets: true,specialChars: false,});
  console.log(`generated otp =====${OTP}`)
  return OTP;
};

// The OTP_LENGTH is a number, For my app i selected 10.
// The OTP_CONFIG is an object that looks like 
// OTP_CONFIG: {
//   upperCaseAlphabets: true,
//   specialChars: false,
// },