import React, { useContext, useEffect } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
import { IoBagHandleOutline  } from 'react-icons/io5'
import CartSingle from './CartSingle'
import { Context } from '../../store/Item_store'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Cart = ({setopenCart}) => {
  const { cart, getCartTotal, getCartItemCount } = useContext(Context);
  const itemCount = getCartItemCount();
  const cartTotal = getCartTotal();
  const user = useSelector((state) => state.user?.user)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Only auto-close when navigation to /checkout or /login was initiated from this cart
    if (location.pathname && location.pathname.startsWith('/checkout')) {
      let fromCart = false
      try { fromCart = sessionStorage.getItem('checkoutFromCart') === '1' } catch (e) { fromCart = false }
      if (fromCart) {
        try { sessionStorage.removeItem('checkoutFromCart') } catch (e) {}
        setopenCart(false)
      }
    }

    if (location.pathname && location.pathname.startsWith('/login')) {
      let fromCartLogin = false
      try { fromCartLogin = sessionStorage.getItem('loginFromCart') === '1' } catch (e) { fromCartLogin = false }
      if (fromCartLogin) {
        try { sessionStorage.removeItem('loginFromCart') } catch (e) {}
        setopenCart(false)
      }
    }
  }, [location.pathname, setopenCart])

  return (
    <div className='fixed top-0 left-0 w-full h-screen z-50 bg-[#0000004b]'>
      <div className='fixed top-0 right-0 h-screen w-[65%] md:w-[25%] bg-white flex flex-col shadow-sm overflow-hidden'>
          {/* Header with close button */}
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className='cursor-pointer'
              onClick={()=>setopenCart(false)}
            />
          </div>
          
          {/* Cart header with count */}
          <div className={`${styles.noramlFlex} p-4 border-b`}>
            <IoBagHandleOutline size={25}/>
            <h5 className='pl-2 text-[20px] font-[500]'>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </h5>
          </div>

          {/* Scrollable cart items container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <CartSingle key={index} data={item} />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center">
                <h5>Cart is empty!</h5>
              </div>
            )}
          </div>

          {/* Summary + Checkout actions */}
          <div className="px-5 py-3 border-t">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="font-medium">USD ${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-sm text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between mb-4 border-t pt-3">
              <span className="text-base font-semibold">Total</span>
              <span className="text-base font-semibold">USD ${cartTotal.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              {cart.length > 0 ? (
                user?._id ? (
                  <div className="block w-full">
                    <button
                      onClick={() => {
                        // mark that navigation to checkout came from cart, close overlay, then navigate
                        try { sessionStorage.setItem('checkoutFromCart', '1') } catch (e) {}
                        setopenCart(false)
                        setTimeout(() => navigate('/checkout'), 200)
                      }}
                      className={`flex items-center justify-center w-full bg-[#e44343] rounded-[5px] h-11 text-white outline-none hover:opacity-90 transition-opacity`}
                    >
                      Checkout Now (USD ${cartTotal.toFixed(2)})
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      try { sessionStorage.setItem('loginFromCart', '1') } catch (e) {}
                      setopenCart(false)
                      setTimeout(() => navigate('/login', { state: { from: '/checkout' } }), 200)
                    }}
                    className={`flex items-center justify-center w-full bg-yellow-500 rounded-[5px] h-11 text-white outline-none hover:opacity-90 transition-opacity`}
                  >
                    Login to Checkout
                  </button>
                )
              ) : (
                <button 
                  className={`flex items-center justify-center w-full bg-gray-400 cursor-not-allowed rounded-[5px] h-11 text-white outline-none`}
                  disabled
                >
                  Checkout Now (USD $0.00)
                </button>
              )}

              <div className="block w-full">
                <button
                  onClick={() => { setopenCart(false); navigate('/products') }}
                  className={`flex items-center justify-center w-full border border-gray-300 rounded-[5px] h-11 text-gray-700 outline-none hover:bg-gray-50`}
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Cart
