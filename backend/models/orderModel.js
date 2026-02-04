const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
  items: [{ productId: String, name: String, qty: Number, price: Number }],
  shipping: { name: String, address: String, city: String, zip: String, country: String },
  total: Number,
  paymentStatus: { type: String, default: 'paid' },
  paymentProviderId: String,
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)
