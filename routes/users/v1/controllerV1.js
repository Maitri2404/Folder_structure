const fs = require('fs');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');
const { getUsersFromFile, isUserUnique, } = require('../middleware/middleware');
const { validateUsername, validatePassword, isEmpty, validatePhoneNumber } = require('./validator');

function handleAddUser(req, res) {
  const { fullname, username, password, email, phoneNumber, department } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRound);
  const user = {
    fullname,
    username,
    password: hashedPassword,
    email,
    phoneNumber,
    department,
  };

  if (isEmpty(username, password, fullname, email, phoneNumber, department)) {
    res.status(400).json({ error: 'All fields are required...!!' });
  } else if (!isUserUnique(user)) {
    res.status(400).json({ error: 'Username or email already exists...' });
  } else if (!validateUsername(user.username)) {
    res.status(400).json({ error: 'Invalid username. It should contain one capital letter and other numbers.' });
  } else if (!validatePassword(user.password)) {
    res.status(400).json({
      error: 'Invalid password. It should contain at least one capital letter, one small letter, one symbol, and a total length of 16 characters.',
    });
  } else if (!validatePhoneNumber(user.phoneNumber)) {
    res.status(400).json({ error: "Please enter valid phone number" })
  }
  else {
    const data = getUsersFromFile();
    data.users.push(user);
    fs.writeFileSync('./routes/users/users.json', JSON.stringify(data));
    res.status(201).json({ message: 'User created successfully' });
  }
}

function handleGetUsers(req, res) {
  const data = getUsersFromFile();
  const users = data.users;
  res.status(200).json({ message: 'Get users successfully', users });
}

function handleUpdateUser(req, res) {
  const { username } = req.body;
  if (!validateUsername(username)) {
    res.status(400).json({
      error: 'Invalid username. It should have at least one capital letter, other numbers',
    });
  } else {
    const data = getUsersFromFile();
    const user = data.users.find((user) => user.username === req.params.username);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      user.username = username;
      fs.writeFileSync('./routes/users/users.json', JSON.stringify(data));
      res.status(200).json({ message: 'Username updated successfully' });
    }
  }
}

function handleUpdatePassword(req, res) {
  const { username, password } = req.body;
  console.log("req", req.body)
  const hashedPassword = bcrypt.hashSync(password, saltRound);
  if (!validatePassword(password)) {
    res.status(400).json({
      error: 'Invalid password. It should have at least one capital letter, one small letter, one symbol, and a total length of 16 characters.',
    });
  } else {
    const data = getUsersFromFile();
    const user = data.users.find((user) => user.username === req.params.username);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      user.password = hashedPassword;
      fs.writeFileSync('./routes/users/users.json', JSON.stringify(data));
      res.status(200).json({ message: 'Password updated successfully' });
    }
  }
}

function handleLogin(req, res) {
  const { username, password } = req.body;
  const data = getUsersFromFile();
  const user = data.users.find((user) => user.username === username);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.json({ error: err });
      } else if (result) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    });
  }
}

module.exports = { handleAddUser, handleGetUsers, handleUpdateUser, handleUpdatePassword, handleLogin };
