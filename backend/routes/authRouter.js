const router = require('express').Router();
const {googleLogin} = require('../controller/authController')

router.get('/test',(req,res)=>{
  res.send('test pas')
})

router.get('/google',googleLogin)
module.exports = router;
