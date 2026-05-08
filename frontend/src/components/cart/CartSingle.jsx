import React, { useContext } from 'react'
import { HiOutlineMinus, HiPlus} from "react-icons/hi";
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { Context } from '../../store/Item_store';
import { toast } from 'react-toastify';

const CartSingle = ({data}) => {
  const { updateCartItemQty, removeFromCart } = useContext(Context);
  const totalPrice = data.discount_price ? data.discount_price * data.qty : data.price * data.qty;
  
  // Ensure we have an ID to work with
  const itemId = data.id || '';

  // Function to get the correct image URL
  const getImageUrl = (path) => {
    // If the path is a full URL (starts with http or https), return it as is
    if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
      return path;
    }
    // Otherwise, prepend the public path
    return path ? `/${path}` : '';
  };

  // Handle remove from cart
  const handleRemoveFromCart = () => {
    removeFromCart(itemId);
    toast.success("Item removed from cart!");
  };

  return (
    <div className="border-b p-4 hover:bg-gray-50 transition-colors">
      <div className="w-full flex flex-wrap items-center">
        {/* Quantity controls */}
        <div className="flex items-center mb-2 w-full">
          <div className="flex items-center">
            <div className={`${styles.noramlFlex} bg-[#e44343] border-[#e4434373] rounded-full w-[25px] h-[25px] justify-center cursor-pointer hover:opacity-90 transition-opacity`}
              onClick={() => updateCartItemQty(itemId, data.qty + 1)}>
              <HiPlus size={18} color='#fff'/>
            </div>
            <span className='px-3 font-medium'>
              {data.qty}
            </span>
            <div className='bg-[#a7abb14f] rounded-full w-[25px] h-[25px] justify-center items-center cursor-pointer flex hover:bg-[#a7abb17a] transition-colors' 
              onClick={() => updateCartItemQty(itemId, data.qty > 1 ? data.qty - 1 : 1)}>
              <HiOutlineMinus size={16} color='#7d879c'/>
            </div>
          </div>
          
          <div className="ml-auto">
            <RxCross1 
              size={18}
              className='cursor-pointer text-gray-600 hover:text-red-500 transition-colors' 
              onClick={handleRemoveFromCart}
              title="Remove from cart"
            />
          </div>
        </div>
        
        {/* Product details */}
        <div className="flex w-full">
          <img 
            src={data.image_Url && data.image_Url[0] ? getImageUrl(data.image_Url[0].url) : "images/57.png"} 
            alt={data.name || "Product image"} 
            className='w-[70px] h-[70px] rounded-md object-contain'
          />
          
          <div className='pl-3 flex-1'>
            <h5 className="text-sm font-medium line-clamp-1">{data.name}</h5>
            <div className="flex items-center gap-2 mt-1">
              <h4 className='text-[14px] text-gray-600'>${data.discount_price || data.price} × {data.qty}</h4>
            </div>
            <h4 className='font-semibold text-[16px] text-[#d02222] mt-1'>
              US ${totalPrice.toFixed(2)}
            </h4>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default CartSingle
