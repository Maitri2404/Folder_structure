const fs=require('fs');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const {getUsersFromFile}=require('./v1/middlewareV1')
// const {login }=require('./v1/controllerV1');

function login(req,res){
    const {username,password}=req.body;
    const data=getUsersFromFile();
    const userFound=data.users.find((user)=>user.username===username);
    if(!userFound){
        return res.status(404).json({error:"user not found"})
    }
    bcrypt.compare(password,userFound.password,(err,isMatch)=>{
        if(err){
            res.json({Error:err})
        }
        else if(!isMatch){
            res.send("Password doesn't match")
        }
        else{
            const token=jwt.sign({username:user.username},process.env.SECRET_KEY)
            res.json({token})
            console.log(token);
        }
    })
}

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: err.stack });
      }
  
      req.username = decoded.username;
      const user = require('./users.json').find(u => u.username === decoded.username);
      console.log(user);
      if (!user || !isAuthorized(user.department)) {
        return res.status(403).json({ error: 'Forbidden2' });
      }
  
      next();
    });
  }

  function isAuthorized(department){
    if(department==='node'){
      return true;
    }
    return false;
  }
  
module.exports={authenticateToken,login}