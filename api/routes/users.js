const express = require('express');
const {signup} = require('../controller/users') 
const router = express.Router();

router.post('/signup',signup);
router.get('/',(req,res)=>{
    res.send('Hello ')
})

module.exports = router;