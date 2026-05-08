import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styles from '../styles/styles';
import Productcard from '../components/product/Productcard';
import { productData } from "../data/Alldata";
// import Loader from "../components/Layout/Loader";

const ProductPage = () => {
  
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  // const {isLoading} = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  
  useEffect(()=>{
    if(categoryData === null){
      const d = productData && productData.sort((a,b)=> a.total_sell - b.total_sell);
      setData(d)
    }else{
      const d = productData && productData.filter((i)=> i.category === categoryData);
      setData(d);
    }
  },[]);

  return (
    <>
    {/* {
      isLoading ?(
        <Loader/>
      ):( */}
    <div>
      <br />
      <br />
      <br />
    
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <Productcard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
    </div>
      {/* )
    } */}
    </>
  )
}

export default ProductPage
