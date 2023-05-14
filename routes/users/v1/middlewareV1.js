const fs = require('fs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

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

function defaultRoute(req,res){
  res.status(404).json({Error:"Oops!! not found"});
}


function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'mncd1234') {
    res.status(401).json({ error: 'Invalid API key' });
  } else {
    next();
  }
}

function isAuthorized(department) {
  if (department === 'node' || path.startsWith('/user')) {
    return true;
  }
  return false;
}


function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decodedUsername = verifyToken(token);

  if (!decodedUsername) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const data = getUsersFromFile();
  const user = data.users.find((user) => user.username === decodedUsername);

  if (!user || !isAuthorized(user.department, req.path, req.method)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
}



module.exports = {
  getUsersFromFile,
  isUserUnique,
  validateApiKey,
  defaultRoute,
  authenticateToken

};
