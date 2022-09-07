const CryptoJS = require('crypto-js');
const config = require('config');

const check = (userPassword, inputPassword) => {
  console.log(userPassword, inputPassword);
  const secretKey = CryptoJS.AES.decrypt(
    userPassword.trim(),
    inputPassword.trim()
  ).toString(CryptoJS.enc.Utf8);

  return secretKey === config.sercretkey;
};

const encrypt = (password) => {
  return CryptoJS.AES.encrypt(config.secretkey, password.trim()).toString();
};

module.exports = {
  check,
  encrypt,
};
