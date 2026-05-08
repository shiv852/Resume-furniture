import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineShoppingCart, AiOutlineEye, AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { Context } from "../../store/Item_store";
import { toast } from "react-toastify";

const Productcard = ({ data }) => {
  console.log("Productcard - Product data:", data);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useContext(Context);

  // Get the product ID for the URL
  const productId = data.id;

  // Check if product is in wishlist on component mount
  useEffect(() => {
    if (data && data.id) {
      setClick(isInWishlist(data.id));
    }
  }, [data, isInWishlist]);

  // Function to get the correct image URL
  const getImageUrl = (path) => {
    // If the path is a full URL (starts with http or https), return it as is
    if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
      return path;
    }
    // Otherwise, prepend the public path
    return path ? `/${path}` : '';
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (data) {
      if (click) {
        removeFromWishlist(data.id);
        toast.success("Item removed from wishlist!");
      } else {
        addToWishlist(data);
        toast.success("Item added to wishlist!");
      }
      setClick(!click);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (data) {
      addToCart({ ...data, qty: 1 });
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${productId}`}>
          <img
            src={getImageUrl(data.image_Url[0].url)}
            alt="Product image"
            className="w-full overflow-hidden h-[170px] object-contain"
          />
        </Link>
        <Link to="/" className="no-underline">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${productId}`} className="no-underline">
          <p className="text-black pb-1  font-[300] ">
            {data.name.length > 40 ? data.name.slice(0, 30) + "..." : data.name}
          </p>
        </Link>
        <div className="flex">
          <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
          <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
          <AiOutlineStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>${data.discount_price}</h5>
            <h4 className={`${styles.price}`}>{data.price ? "$" + data.price : null}</h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">{data.total_sell} sold</span>
        </div>
        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={handleWishlistToggle}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={handleWishlistToggle}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={handleAddToCart}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default Productcard;
