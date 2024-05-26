const User = require('../models/user')
const jwt = require('jsonwebtoken');

const signup = async (req,res)=>{
    try{
        const {empCode,email,password} = req.body;
        // console.log(empCode);
        const newUser = new User(
            {
            empCode,
            email,
            password
            }
            
        );
        await newUser.save();

        //generate jwt
        const payload = {id : newUser._id,email : newUser.email,empCode : newUser.empCode};
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(201).json({user:newUser,token});
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


module.exports = {
    signup
}