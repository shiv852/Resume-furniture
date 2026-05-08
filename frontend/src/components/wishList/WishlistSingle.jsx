import React, { useContext } from 'react'
import { RxCross1 } from 'react-icons/rx';
import { BsCartPlus } from "react-icons/bs";
import { Context } from '../../store/Item_store';
import { toast } from 'react-toastify';

const WishlistSingle = ({data}) => {
  const { removeFromWishlist, moveToCart } = useContext(Context);
  
  // Function to get the correct image URL
  const getImageUrl = (path) => {
    // If the path is a full URL (starts with http or https), return it as is
    if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
      return path;
    }
    // Otherwise, prepend the public path
    return path ? `/${path}` : '';
  };
  
  // Handle remove from wishlist
  const handleRemoveFromWishlist = () => {
    removeFromWishlist(data.id);
    toast.success("Item removed from wishlist!");
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    moveToCart(data.id);
    toast.success("Item added to cart!");
  };

  return (
    <div className="border-b p-4 hover:bg-gray-50 transition-colors">
      <div className="w-full flex flex-wrap items-center">
        {/* Header with actions */}
        <div className="flex items-center w-full mb-2">
          <h5 className="text-sm font-medium line-clamp-1 flex-1">{data.name}</h5>
          
          <div className="flex items-center gap-3">
            <BsCartPlus 
              size={20} 
              className='cursor-pointer text-gray-600 hover:text-blue-500 transition-colors' 
              title='Add to cart'
              onClick={handleAddToCart}
            />
            <RxCross1 
              className='cursor-pointer text-gray-600 hover:text-red-500 transition-colors' 
              onClick={handleRemoveFromWishlist}
              size={18}
              title="Remove from wishlist"
            />
          </div>
        </div>
        
        {/* Product details */}
        <div className="flex w-full">
          <img 
            src={data.image_Url && data.image_Url[0] ? getImageUrl(data.image_Url[0].url) : "images/img5.jpg"} 
            alt={data.name || "Product image"} 
            className='w-[70px] h-[70px] rounded-md object-contain'
          />
          
          <div className='pl-3 flex-1'>
            <div className="flex items-center gap-2">
              <h4 className='font-semibold text-[15px]'>${data.discount_price || data.price}</h4>
              {data.price && data.discount_price && (
                <h4 className='text-[13px] text-gray-500 line-through'>${data.price}</h4>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {data.description ? data.description.substring(0, 60) + (data.description.length > 60 ? '...' : '') : ''}
            </p>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default WishlistSingle
