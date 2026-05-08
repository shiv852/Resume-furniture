import React from 'react'
import { useParams, Link } from 'react-router-dom'

const OrderSuccess = () => {
  const { id } = useParams()
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
      <p className="mb-3">Order ID: <strong>{id}</strong></p>
      <p className="mb-6">We received your payment (mock) and are processing your order.</p>
      <Link to="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Continue shopping</Link>
    </div>
  )
}

export default OrderSuccess
