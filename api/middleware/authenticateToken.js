const jwt = require('jsonwebtoken');
const authenticateToken = (req,res,next) =>{
   const token = req.cookies.jwt;
   if(!token){
        return res.status(401).json({ message: 'Access denied. No token provided.' });
   }
   try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.empCode = decoded.empCode;
    next();
   }catch(err){
        res.status(400).json({ message: 'Invalid token.' });
   }
}

module.exports = authenticateToken;
