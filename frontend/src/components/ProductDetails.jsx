import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetailsInfo from "./ProductDetailsInfo";
import { Context } from "../store/Item_store";
import { toast } from "react-toastify";

const ProductDetails = ({data}) => {
  console.log("ProductDetails - Received data:", data);
 
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useContext(Context);

  // Check if product is in wishlist on component mount
  useEffect(() => {
    if (data && data.id) {
      setClick(isInWishlist(data.id));
    }
  }, [data, isInWishlist]);

  const incrementCount=()=>{
      setCount(count + 1)
  }
  const decrementCount=()=>{
    if(count > 1){
      setCount(count -1)
    }
  }

  const handleMessageSubmit =()=>{
    navigate("/inbox?conversation=563gsfdgweprutoibntwpruhla")
  }

  // Function to get the correct image URL
  const getImageUrl = (path) => {
    console.log("ProductDetails - Getting image URL for path:", path);
    // If the path is a full URL (starts with http or https), return it as is
    if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
      return path;
    }
    // Otherwise, prepend the public path
    return path ? `/${path}` : '';
  };

  // Check if image array exists and has items
  const hasImages = data && data.image_Url && Array.isArray(data.image_Url) && data.image_Url.length > 0;
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (data) {
      // Generate a unique ID if the product doesn't have one
      const productId = data.id || `product_${Date.now()}`;
      
      const cartItem = {
        ...data,
        id: productId,
        qty: count
      };
      
      addToCart(cartItem);
      // Show success message
      toast.success("Item added to cart successfully!");
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (data) {
      // Generate a unique ID if the product doesn't have one
      const productId = data.id || `product_${Date.now()}`;
      
      const wishlistItem = {
        ...data,
        id: productId
      };
      
      if (click) {
        removeFromWishlist(productId);
        toast.success("Item removed from wishlist!");
      } else {
        addToWishlist(wishlistItem);
        toast.success("Item added to wishlist!");
      }
      
      setClick(!click);
    }
  };

  console.log("current data is here :" ,  data)

  // Check if data is valid and has required properties
  if (!data) {
    console.log("ProductDetails - No data provided");
    return <div className="text-center py-10">Loading product details...</div>;
  }

  if (!data.image_Url || !Array.isArray(data.image_Url) || data.image_Url.length === 0) {
    console.error("ProductDetails - Invalid image data:", data.image_Url);
    return <div className="text-center py-10">Error: Product image data is invalid</div>;
  }

  // Helper function to get image URL from the data
  const getProductImageUrl = (index) => {
    if (!data.image_Url || !data.image_Url[index]) return '';
    
    const url = data.image_Url[index].url;
    return url.startsWith('http') || url.startsWith('/') ? url : '/' + url;
  };

  return (
    <>
      <div className="bg-white pt-20">
        {data ? (
          <div className={`${styles.section} w-[90%] 800px:w-[80%] mx-auto`}>   
            <div className="w-full py-5">
              <div className=" w-full flex "> 
                    
                    <div className="w-full 800px:w-[50%] flex-row  items-center  md:block justify-between">
                      <div className="w-full flex justify-center mb-4 ">
                        <img 
                          src={getProductImageUrl(select)}
                          alt={data.name || "Product image"} 
                          className="w-[90%] max-w-[400px] h-auto object-contain rounded-lg shadow-md"
                        />
                      </div>
                      
                      {/* Thumbnails row */}
                      <div className="flex justify-center gap-3 mt-2 flex-wrap">
                        {data.image_Url.map((image, index) => (
                          <div 
                            key={index}
                            className={`cursor-pointer transition-all duration-300 ${select === index ? 
                              "border-2 border-teal-500 shadow-md transform scale-105" : 
                              "border border-gray-300 opacity-70 hover:opacity-100"}`}
                            onClick={() => setSelect(index)}
                          >
                            <img 
                              src={image.url.startsWith('http') || image.url.startsWith('/') ? 
                                image.url : '/' + image.url}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-[60px] h-[60px] object-cover rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>


                {/* Product details section */}
                    <div className="w-full 800px:w-[50%] mt-8 800px:mt-0 800px:pl-8 block justify-between">
                      <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                      <p className="text-gray-600 mt-2">{data.description}</p>
                      <div className="flex mt-4 items-center">
                        <h4 className={`${styles.productDiscountPrice} text-xl font-bold`}>${data.discount_price}</h4>
                        {data.price && (
                          <h3 className={`${styles.price} ml-3 line-through text-gray-500`}>
                            ${data.price}
                          </h3>
                        )}
                      </div>
                    
                      <div className="flex items-center mt-8 justify-between">
                        <div className="flex items-center">
                          <button 
                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out" 
                            onClick={decrementCount}
                          >
                            -
                          </button>
                          <span className="bg-gray-200 text-gray-800 font-medium px-6 py-[11px]">
                            {count}
                          </span>
                          <button 
                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out" 
                            onClick={incrementCount}
                          >
                            +
                          </button>
                        </div>

                        <div>
                          {click ? (
                            <AiFillHeart
                              size={30}
                              className="cursor-pointer hover:scale-110 transition-transform"
                              onClick={handleWishlistToggle}
                              color="red"
                              title="Remove from wishlist"
                            />
                          ) : (
                            <AiOutlineHeart
                              size={30}
                              className="cursor-pointer hover:scale-110 transition-transform"
                              onClick={handleWishlistToggle}
                              color="#333"
                              title="Add to wishlist"   
                            />
                          )}
                        </div>
                      </div>
                      
                      <button 
                        className={`${styles.button} w-full mt-6 rounded-lg h-12 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity`} 
                        onClick={handleAddToCart}
                      >
                        <span className="text-white flex items-center">
                          Add to Cart <AiOutlineShoppingCart className="ml-2" size={20}/>
                        </span>
                      </button>

                      <div className="flex items-center mt-8 border-t pt-6">
                        <img 
                          src={getImageUrl(data.shop?.shop_avatar?.url)} 
                          alt="Shop avatar" 
                          className="w-[50px] h-[50px] mr-3 rounded-full object-cover border border-gray-200"
                        />

                        <div className="flex-1">
                          <h3 className={`${styles.shop_name} font-semibold`}>
                            {data.shop?.name}
                          </h3>
                          <h5 className="text-[15px] text-gray-600">
                            ({data.shop?.ratings || 0}) Ratings
                          </h5>
                        </div>
                        
                        <button 
                          className={`${styles.button} bg-[#6443d1] rounded-lg h-11 px-4 hover:opacity-90 transition-opacity`}
                          onClick={handleMessageSubmit}
                        >
                          <span className="text-white flex items-center whitespace-nowrap">
                            Message <AiOutlineMessage className="ml-1"/>
                          </span>
                        </button>       
                      </div>
                    </div>
              </div>
            </div>
            <ProductDetailsInfo data={data}/>
            <br />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProductDetails;
