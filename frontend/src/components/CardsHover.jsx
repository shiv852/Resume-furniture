
import React from 'react'
import stylee from "./Cards.module.css"
import { Link } from 'react-router-dom'

const CardsHover = ({item}) => {
  return (
    

      // md:mx-3 md:my-5
      
               <div className={`${stylee.finalbox}  `}>     
               <div className={`${stylee.completebox} ml-9 md:ml-16`}>     

              <div className={`${stylee.container}  `}>
                  <div className={`${stylee.card} `}>
                      <div className= {`${stylee.imgBx}`}>  
                        <img  src={item.images} alt="" />
                      </div>
                      <div className={`${stylee.content}`}>
                      <h3>{item.heading}</h3> 
                      <p style={{fontFamily:" Gill Sans" }}>{item.para}</p>
                      <Link to="/products" className='no-underline'><button className="text-black flex mx-auto  text-center items-center   cursor-pointer duration-200 hover:scale-125 active:scale-100 px-2" style={{border:"solid 1px#eee"}} title="Go Back">More Product
                          <svg  xmlns="http://www.w3.org/2000/svg" width="50px" height="38px" viewBox="0 0 24 24" className="stroke-blue-300 rotate-180">
                              <path strokeLinejoin="round-right" strokeLinecap="round-right" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
                          </svg>
                      </button>
                      </Link>
                      </div>
                  </div>
              </div>
  
              </div>
              </div>
      
      
  

  )
}

export default CardsHover
