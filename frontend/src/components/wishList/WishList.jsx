import React, { useContext } from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
import WishlistSingle from './WishlistSingle'
import { AiOutlineHeart } from 'react-icons/ai'
import { Context } from '../../store/Item_store'

const WishList = ({setOpenWishlist}) => {
  const { wishlist, getWishlistItemCount } = useContext(Context);
  const wishlistCount = getWishlistItemCount();

  return (
    <div className='fixed top-0 left-0 w-full h-screen z-50 bg-[#0000004b]'>
      <div className='fixed top-0 right-0 h-screen w-[65%] md:w-[25%] bg-white flex flex-col shadow-sm overflow-hidden'>
          {/* Header with close button */}
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className='cursor-pointer'
              onClick={()=>setOpenWishlist(false)}
            />
          </div>
          
          {/* Wishlist header with count */}
          <div className={`${styles.noramlFlex} p-4 border-b`}>
            <AiOutlineHeart size={25}/>
            <h5 className='pl-2 text-[20px] font-[500]'>
              {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}
            </h5>
          </div>

          {/* Scrollable wishlist items container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {wishlist.length > 0 ? (
              wishlist.map((item, index) => (
                <WishlistSingle key={index} data={item} />
              ))
            ) : (
              <div className="w-full h-[200px] flex items-center justify-center">
                <h5>Wishlist is empty!</h5>
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

export default WishList
