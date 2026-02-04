const Order = require('../models/orderModel')

async function mockPay(req, res) {
  try {
    const { amount, shipping, items } = req.body
    // create a mock order record
    const order = await Order.create({
      userId: req.userId || null,
      items: items.map(i => ({ productId: i.id || i.productId, name: i.name, qty: i.qty, price: i.discount_price || i.price })),
      shipping,
      total: (amount || 0) / 100,
      paymentStatus: 'paid',
      paymentProviderId: `mock_${Date.now()}`,
    })

    return res.json({ success: true, orderId: order._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { mockPay }
