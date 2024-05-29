const express = require('express');
const {signup,login,profile} = require('../controller/users') 
const authenticateToken = require('../middleware/authenticateToken')
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/profile',authenticateToken,profile);
router.get('/',(req,res)=>{
    res.send('Hello ')
})

module.exports = router;