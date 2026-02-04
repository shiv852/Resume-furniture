import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/Item_store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(Context)
  const total = getCartTotal()
  const user = useSelector(state => state.user?.user)
  const navigate = useNavigate()

  // Redirect away if cart is empty
  useEffect(() => {
    if (!cart || cart.length === 0) {
      // optionally show a brief message in future
      navigate('/products', { replace: true })
    }
  }, [cart, navigate])

  const [shipping, setShipping] = useState({ name: user?.name || '', address: '', city: '', zip: '', country: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value })

  const handleMockPay = async () => {
    if (cart.length === 0) return
    setLoading(true)
    setError('')
    try {
      const resp = await fetch('http://localhost:3000/api/mock-pay', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ amount: Math.round(total * 100), shipping, items: cart })
      })
      const data = await resp.json()
      if (data.success) {
        clearCart()
        navigate(`/order-success/${data.orderId}`)
      } else {
        setError(data.message || 'Payment failed')
      }
    } catch (err) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Shipping</h3>
          <input name="name" value={shipping.name} onChange={handleChange} placeholder="Full name" className="w-full mb-2 p-2 border" />
          <input name="address" value={shipping.address} onChange={handleChange} placeholder="Address" className="w-full mb-2 p-2 border" />
          <input name="city" value={shipping.city} onChange={handleChange} placeholder="City" className="w-full mb-2 p-2 border" />
          <input name="zip" value={shipping.zip} onChange={handleChange} placeholder="ZIP" className="w-full mb-2 p-2 border" />
          <input name="country" value={shipping.country} onChange={handleChange} placeholder="Country" className="w-full mb-2 p-2 border" />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="border p-3 mb-3">
            {cart.map((it, idx) => {
              const unitPrice = it.discount_price || it.price || 0
              const lineTotal = unitPrice * (it.qty || 1)
              // choose first image if present
              const imgSrc = (it.image_Url && it.image_Url[0] && it.image_Url[0].url)
                ? (it.image_Url[0].url.startsWith('http') ? it.image_Url[0].url : `/${it.image_Url[0].url}`)
                : ''

              return (
                <div key={idx} className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                      {imgSrc ? (
                        <img src={imgSrc} alt={it.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-xs text-gray-500">No image</div>
                      )}
                    </div>
                    <div className="max-w-[12rem]">
                      <div className="font-medium text-sm truncate">{it.name}</div>
                      <div className="text-xs text-gray-500">Unit: USD ${unitPrice.toFixed(2)} • Qty: {it.qty}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">USD ${lineTotal.toFixed(2)}</div>
                </div>
              )
            })}
            <div className="flex justify-between mt-3 font-semibold">
              <div>Total</div>
              <div>USD ${total.toFixed(2)}</div>
            </div>
          </div>

          {error && <div className="text-red-600 mb-2">{error}</div>}

          <button onClick={handleMockPay} disabled={loading || cart.length===0} className="w-full bg-green-600 text-white p-3 rounded">
            {loading ? 'Processing...' : `Pay USD ${total.toFixed(2)} (Mock)`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
