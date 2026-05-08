import React, { useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import img from "./Header.module.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiUser } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Cart from "./cart/Cart";
import WishList from "./wishList/WishList";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Context } from "../store/Item_store";

const Header = () => {
  const [openCart, setopenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [menuDisplay, setmenuDisplay] = useState(false);
  
  // Get cart context
  const { getCartItemCount, getWishlistItemCount } = useContext(Context);
  const cartItemCount = getCartItemCount();
  const wishlistItemCount = getWishlistItemCount();
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  console.log("user is ", user); // backend userdetails.js se user ki details sari header m display ho gyi login section ki

  // 3:45:48
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null)); //login user logout hoga toh refresh krna nhi padega logout kitimeprsidha logout-ho-jyega
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-10">
        <div className="absolute w-[100%]">
          <div className={`${img.nav} flex items-center`}>
            <Sidebar />
            <Link
              to="/"
              className={`${img.logo} ml-[3rem] md:ml-[3px] order-2 md:order-1 logo z-10 flex lg:z-10`}
            >
              <span className="md:text-white" style={{ fontWeight: "200" }}>
                Jaipur
              </span>

              <h1 className={`${img.logofonts} md:text-white`}>furniture</h1>
            </Link>

            <div className="order-3 search ml-[48px] z-10 relative items-center flex flex-row">
              <div className="relative">
                <AiOutlineHeart
                  size={24}
                  className="text-white px-2 w-11 h-11 cursor-pointer"
                  onClick={() => setOpenWishlist(true)}
                />
                {wishlistItemCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {wishlistItemCount}
                  </span>
                )}
              </div>
              <div
                className={`${img.bag} cursor-pointer order-4 my-auto flex relative`}
                onClick={() => setopenCart(true)}
              >
                <AiOutlineShoppingCart size={24} className="text-white" />
                {cartItemCount > 0 && (
                  <span
                    className={`${img.zero} absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}
                  >
                    {cartItemCount}
                  </span>
                )}
              </div>

              <div className="order-5">
                <span
                  className="lg:hidden my-auto"
                  onClick={() => setmenuDisplay((preve) => !preve)}
                >
                  <div className="w-[4rem] flex items-center justify-center h-15">
                    {user?.profilePic ? (
                      <div className="w-12 h-12 overflow-hidden rounded-full">
                        <img
                          src={user?.profilePic}
                          className="h-full"
                          alt={user?.name}
                        />
                      </div>
                    ) : (
                      <Link to="/login" className="text-3xl text-white mx-auto">
                        <CiUser />
                      </Link>
                    )}
                    {user?._id &&
                      menuDisplay && (
                        <div className="absolute top-11 p-2 shadow-lg rounded h-fit bg-white bottom-0">
                          <nav>
                            <Link
                              to={"admin-panel"}
                              className="whitespace-nowrap hover:bg-slate-100 p-2 no-underline text-black"
                            >
                              Admin
                            </Link>
                            <div className="text-black">
                              {user?._id ? (
                                <button
                                  onClick={handleLogout}
                                  className="whitespace-nowrap hover:bg-slate-100 p-2 text-black"
                                >
                                  {" "}
                                  - logout
                                </button>
                              ) : (
                                <Link
                                  to="/login"
                                  className="text-white mx-auto"
                                >
                                  <CiUser />
                                </Link>
                              )}
                            </div>
                          </nav>
                        </div>
                      )}

                    {}
                  </div>
                </span>
              </div>
            </div>

            <div
              className={`${img.list} heading md:order-2 lg:z-10 hidden lg:flex lg:mx-auto lg:list-none space-x-12`}
            >
              <Link to="/" className="no-underline">
                {" "}
                <li className="md:ml-14 transition hover:border-b-2 hover:border-black text-cyan-50 cursor-pointer">
                  Home
                </li>
              </Link>
              <Link to="/products" className="no-underline">
                {" "}
                <li className="transition hover:border-b-2 hover:border-black text-cyan-50 cursor-pointer">
                  Product
                </li>
              </Link>
              <Link to="/content" className="no-underline">
                {" "}
                <li className="transition hover:border-b-2 hover:border-black text-cyan-50 cursor-pointer">
                  content
                </li>
              </Link>
            </div>

            <div className="loginbtn md:order-3 hidden lg:z-20 lg:block">
              <div className="flex items-center gap-4">
                <div className="relative flex justify-center">
                  {user?._id && (
                    <div
                      className="text-3xl cursor-pointer relative flex justify-center"
                      onClick={() => setmenuDisplay((preve) => !preve)}
                    >
                      {user?.profilePic ? (
                        <div className="border-2 mx-3 w-12 h-12 overflow-hidden rounded-full">
                          <img
                            src={user?.profilePic}
                            className="h-full"
                            alt={user?.name}
                          />
                        </div>
                      ) : (
                        <FaRegUserCircle />
                      )}
                    </div>
                  )}

                  {menuDisplay && (
                    <div className="absolute top-11 p-2 shadow-lg rounded h-fit bg-white bottom-0">
                      <nav>
                        <Link
                          to={"admin-panel"}
                          className="whitespace-nowrap hover:bg-slate-100 p-2 no-underline"
                        >
                          Admin Panel
                        </Link>
                        <div className="flex flex-row">
                          <Link
                            className="pl-7 no-underline text-black"
                            to={"profilepage"}
                          >
                            Profile
                          </Link>
                        </div>
                      </nav>
                    </div>
                  )}
                </div>
                {user?._id ? (
                  <button
                    onClick={handleLogout}
                    className="border text-gray-50 duration-300 relative group cursor-pointer overflow-hidden h-14 w-36 rounded-md bg-neutral-800 p-2 font-extrabold hover:bg-sky-700 z-10"
                  >
                    <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-12 bg-yellow-500"></div>
                    <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-orange-500"></div>
                    <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-pink-500"></div>
                    <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-red-600"></div>
                    <p className="z-10 absolute bottom-[2px] left-2">logout</p>
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="border text-gray-50 duration-300 relative group cursor-pointer overflow-hidden h-14 w-36 rounded-md bg-neutral-800 p-2 font-extrabold hover:bg-sky-700 z-10">
                      <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-12 bg-yellow-500"></div>
                      <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-orange-500"></div>
                      <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-pink-500"></div>
                      <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-red-600"></div>
                      <p className="z-10 absolute bottom-[2px] left-2">login</p>
                    </button>
                  </Link>
                )}
              </div>
            </div>
            {/* cart popup */}
            {openCart ? <Cart setopenCart={setopenCart} /> : null}
            {/* wishlist popup */}
            {openWishlist ? <WishList setOpenWishlist={setOpenWishlist} /> : null}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
