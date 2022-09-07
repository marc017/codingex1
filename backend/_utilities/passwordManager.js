const CryptoJS = require('crypto-js');
const config = require('config');

const check = (userPassword, inputPassword) => {
  
  const secretKey = CryptoJS.AES.decrypt(
    userPassword.trim(),
    inputPassword.trim()
  ).toString(CryptoJS.enc.Utf8);
  console.log(secretKey, process.env.SECRETKEY, userPassword, inputPassword);
  return secretKey === process.env.SECRETKEY;
};

const encrypt = (password) => {
  console.log(process.env.SECRETKEY);
  return CryptoJS.AES.encrypt(process.env.SECRETKEY, password.trim()).toString();
};

module.exports = {
  check,
  encrypt,
};
