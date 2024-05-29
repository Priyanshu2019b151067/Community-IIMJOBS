const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false, // Set to true in i production
            sameSite: 'None',
            maxAge: 3600000 // 1 hour
          });
        res.status(200).json({user:newUser});
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const login = async (req,res)=>{
    try{
        const {empCode,password} = req.body;
        console.log(empCode);
        console.log(password);
        const fuser =  await User.findOne({empCode});
        if(!fuser){
            return res.status(400).json({message:'User not found'});
        }
        const isPasswordMatch = await bcrypt.compare(password,fuser.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
          }
        //generate jwt
        //const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

        const payload = {id : fuser._id,email : fuser.email,empCode : fuser.empCode};
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: 'None',
            maxAge: 3600000 // 1 hour
          });
        res.status(200).json({ message: 'Authentication successful'});

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const profile = async (req,res) =>{
    try {
        const user = await User.findById(req.id).select('-password');
        if(!user){
            return res.status(404).json({message : 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    signup,login,profile
}