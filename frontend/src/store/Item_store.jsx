import { createContext, useState, useEffect } from "react"
import SummaryApi from "../common";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./userSlice";

export const Context = createContext([]);

// Helper function to check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn('localStorage is not available:', e);
    return false;
  }
};

export const ItemProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const localStorageAvailable = isLocalStorageAvailable();
  
  // Load cart and wishlist from localStorage on initial render (if available)
  useEffect(() => {
    if (localStorageAvailable) {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
      }
    }
    
    // Fetch user details on initial render
    fetchUserDatails();
  }, []);

  // Save cart to localStorage whenever it changes (if available)
  useEffect(() => {
    if (localStorageAvailable) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cart]);
  
  // Save wishlist to localStorage whenever it changes (if available)
  useEffect(() => {
    if (localStorageAvailable) {
      try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
    }
  }, [wishlist]);
   
  // Fetch user details
  const fetchUserDatails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // If item already exists, update quantity
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, qty: cartItem.qty + item.qty } 
          : cartItem
      ));
    } else {
      // Add new item to cart
      setCart([...cart, item]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Update item quantity
  const updateCartItemQty = (itemId, qty) => {
    if (qty <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, qty } : item
      ));
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.discount_price || item.price) * item.qty, 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.qty, 0);
  };
  
  // Add item to wishlist
  const addToWishlist = (item) => {
    const existingItem = wishlist.find(wishItem => wishItem.id === item.id);
    
    if (!existingItem) {
      // Only add if item doesn't already exist in wishlist
      setWishlist([...wishlist, item]);
    }
  };
  
  // Remove item from wishlist
  const removeFromWishlist = (itemId) => {
    setWishlist(wishlist.filter(item => item.id !== itemId));
  };
  
  // Check if item is in wishlist
  const isInWishlist = (itemId) => {
    return wishlist.some(item => item.id === itemId);
  };
  
  // Get wishlist item count
  const getWishlistItemCount = () => {
    return wishlist.length;
  };
  
  // Move item from wishlist to cart
  const moveToCart = (itemId) => {
    const item = wishlist.find(item => item.id === itemId);
    if (item) {
      addToCart({...item, qty: 1});
      removeFromWishlist(itemId);
    }
  };

  return (
    <Context.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateCartItemQty,
      clearCart,
      getCartTotal,
      getCartItemCount,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      getWishlistItemCount,
      moveToCart,
      fetchUserDatails
    }}>
      {children}
    </Context.Provider>
  );
};

