function validateAddUsername(username) {
    const regex =/^[a-z][\w+@#$%_.]/;
    return regex.test(username);
  }
  
  function validateAddPassword(password) {
    const regex = /^[A-Z][\w+@#$%_.]{8,16}$/;
    return regex.test(password);
  }

  function validateUpdateUsername(username){
    const regex=/^[A-Z+]{3,9}$/;
    return regex.test(username);
  }

  function validateUpdatePassword(password){
    const regex=/^[0-9+]{8,16}$/;
    return regex.test(password)
  }

  function isEmpty(username, password, fullname, email, phoneNumber, department) {
    if (!username || !password || !fullname || !email || !phoneNumber || !department) {
      return true;
    }
    return false;
  }
module.exports = { validateAddUsername, validateAddPassword, validateUpdateUsername, validateUpdatePassword, isEmpty };
