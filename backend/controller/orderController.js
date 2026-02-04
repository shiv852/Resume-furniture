const Order = require('../models/orderModel')

async function getUserOrders(req, res) {
  try {
    const userId = req.userId
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' })
    const orders = await Order.find({ userId }).sort({ createdAt: -1 })
    res.json({ success: true, data: orders })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getUserOrders }
