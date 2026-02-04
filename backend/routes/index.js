const express = require("express")

const router = express.Router()
const userSingUpcontroller = require('../controller/userSignUp')
const userSingIncontroller = require('../controller/userSignin')
const userDetailsController = require("../controller/userDetails")
const authToken = require("../middleware/authToken")
const userLogout = require("../controller/userLogout")
const { getUserOrders } = require('../controller/orderController')


router.post("/signup" , userSingUpcontroller)
router.post("/signin" , userSingIncontroller)
router.get("/userdetails",authToken, userDetailsController)
router.get("/userLogout" , userLogout)
router.get('/orders', authToken, getUserOrders)


module.exports = router