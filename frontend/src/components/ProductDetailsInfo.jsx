import React, { useState } from 'react'
import styles from '../styles/styles';
import { Link } from 'react-router-dom';

const ProductDetailsInfo = ({data}) => {
  const [active , setActive]=useState(1);
  return (
    <div>
      <div className='bg-[#f5f6fb]  px-3 800px:px-10 py-2 rounded '>
        <div className="w-full flex justify-between border-b pt-10 pb-2">
          <div className="relative">
            <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={()=>setActive(1)}>
              Product Details
            </h5>
            {
              active === 1 ?(
                <div className={`${styles.active_indicator}`}></div>
              ) : null
            }
          </div>
          <div className="relative">
            <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={()=>setActive(2)}>
              Product Reviews
            </h5>
            {
              active === 2 ?(
                <div className={`${styles.active_indicator}`}></div>
              ) : null
            }
          </div>
          <div className="relative">
            <h5 className='text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]' onClick={()=>setActive(3)}>
              Seller Information
            </h5>
            {
              active === 3 ?(
                <div className={`${styles.active_indicator}`}></div>
              ) : null
            }
          </div>
        </div>

            {
              active === 1 ?(
              <>
               
                <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cupiditate incidunt odit blanditiis id deserunt laborum laudantium ipsam temporibus culpa, reiciendis, ut deleniti doloremque magnam? Tempora vitae alias non, nobis eos dolore aut quidem.</p>
                <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cupiditate incidunt odit blanditiis id deserunt laborum laudantium ipsam temporibus culpa, reiciendis, ut deleniti doloremque magnam? Tempora vitae alias non, nobis eos dolore aut quidem.</p>
                <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cupiditate incidunt odit blanditiis id deserunt laborum laudantium ipsam temporibus culpa, reiciendis, ut deleniti doloremque magnam? Tempora vitae alias non, nobis eos dolore aut quidem.</p>
              </>
              ):null
            }

            

            
            {
              active === 2 ?(
              <div className='w-full justify-center min-h-[40vh] flex items-center'>
                <p>No Review Yet!</p>
              </div>
              ):null
            }
            
            {
              active === 3 &&(
                <div className='w-full md:flex  800px:flex p-5'>
                  <div className="w-full  800px:w-[50%]">
                    <div className="flex items-center">
                      <img src={data.shop.shop_avatar.url} alt="" 
                      className='w-[50px] h-[50px] rounded-full'/>
                          <div className='pl-3 '>
                            <h3 className={`${styles.shop_name}`}>
                                {data.shop.name}
                            </h3>
                            <h5 className='pb-6 text-[15px]'>
                              ({data.shop.ratings})Ratings
                            </h5>
                          </div>
                    </div>
                          <p className='pt-2'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad earum distinctio dolore. Esse provident repellendus reprehenderit? Dignissimos provident non enim recusandae pariatur sed!
                          </p>
                  </div>
                  <div className="w-full  800px:mt-0 800px:w-[50%] 800px:flex ">
                    <div className="text-left flex items-end flex-col">
                      <h5 className='font-[600]'>
                        Joined on:{" "}
                        <span className="font-[500]">
                          14 March,2023 
                           {/* {data.shop?.createdAt?.slice(0, 10)} */}
                        </span>
                      </h5>
                      <h5 className='font-[600] pt-3'>
                        Joined on:{" "}
                        <span className="font-[500]">
                            1,223
                          
                        </span>
                      </h5>
                      <h5 className='font-[600] pt-3'>
                        Joined on:{" "}
                        <span className="font-[500]">
                          324
                  
                        </span>
                      </h5>
                      <Link to="/" className='no-underline'>
                <div
                  className={`${styles.button} rounded-[4px] flex  h-[39.2px] mt-3`}
                >
                  <h6 className="text-white pt-[3px] items-center">deliverd At</h6>
                </div>
              </Link>
                    </div>
                  </div>
                </div>
              )
            }
</div>
    </div>
  )
}

export default ProductDetailsInfo
