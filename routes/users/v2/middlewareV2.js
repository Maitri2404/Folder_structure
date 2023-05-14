const fs = require('fs');

function getUsersFromFile() {
  const data = fs.readFileSync('./routes/users/users.json', 'utf-8');
  return JSON.parse(data);
}

function isUserUnique(user) {
  const users = getUsersFromFile().users;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === user.username || users[i].email === user.email) {
      return false;
    }
  }
  return true;
}

function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'mncd1234') {
    res.status(401).json({ error: 'Invalid API key' });
  } else {
    next();
  }
}

module.exports = {
  getUsersFromFile,
  isUserUnique,
  validateApiKey,
};
