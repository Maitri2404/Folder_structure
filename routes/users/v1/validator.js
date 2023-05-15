function validateUsername(username) {
    const regex = /^[A-Z][A-Z0-9]+$/;
    return regex.test(username);
  }
  
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&_]){8,16}/;
    return regex.test(password);
  }

  function validatePhoneNumber(phoneNumber){
    const regex=/([987]{1})([0-9]{3})([1-9]{4})([0-9]{2})/;
    return regex.test(phoneNumber);
  }

  function isEmpty(username, password, fullname, email, phoneNumber, department) {
    if (!username || !password || !fullname || !email || !phoneNumber || !department) {
      return true;
    }
    return false;
  }

  
module.exports = { validateUsername, validatePassword, isEmpty, validatePhoneNumber };
