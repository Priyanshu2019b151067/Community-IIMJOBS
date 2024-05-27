const express = require('express');
const {signup,login} = require('../controller/users') 
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/',(req,res)=>{
    res.send('Hello ')
})

module.exports = router;