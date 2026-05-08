// kisi bhi product page m product card pr click krunga toh hamko productdetailspage pr navigate kr dega us product card ki productname k saath show in url

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import { productData } from '../data/Alldata';
import SuggestedProduct from './SuggestedProduct';

const ProductdetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Convert the URL parameter to a number for ID comparison
    const productId = parseInt(name);
    
    // Find product by ID
    const foundProduct = productData.find(product => product.id === productId);
    
    setData(foundProduct);
    setLoading(false);
  }, [name]);

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <p className="text-xl">Loading product details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <p className="text-2xl font-semibold">Product not found! Please check the product ID.</p>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails data={data} />
      <SuggestedProduct data={data} />
    </div>
  )
}

export default ProductdetailsPage
