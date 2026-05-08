import React, { useEffect, useState } from 'react'
import { productData } from '../data/Alldata'
import styles from '../styles/styles'
import Productcard from './product/Productcard'
// import Productcard from './Productcard'

const Bestdeals = () => {

  const [Datas , setDatas] = useState([])

  useEffect(()=>{
    const d = productData && productData.sort((a,b)=> b.total_sell - a.total_sell);
    const firstFive = d.slice(0,5);
    setDatas(firstFive)
  },[])

  return (
    <div>
      <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
             
          </div>
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0'>
             {
              Datas.map((item , index)=>(
                <Productcard data={item} key={index}/>
              ))
             }
          </div>
      </div>
    </div>
  )
}

export default Bestdeals
