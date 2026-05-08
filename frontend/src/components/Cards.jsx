
import React from 'react'

import CardsHover from './CardsHover'
import { useSelector } from 'react-redux'
import Boxcard from './Boxcard'


const Cards = () => {
 
    //   const items=
    //       {
  
    //           "images":"images/img10.jpg",
    //          "heading":"furniture1",
    //          "para":"Lorem ccusamus  ducimus doloribus, placeat non. Modi, sunt. Assumenda, in labore!"
    //       }
    
    const cardhoveritems = useSelector((store) => store.cardhoveritems)

         
  return (
    <>
    <Boxcard/>
    <div>
    {cardhoveritems.map((item)=>
       <CardsHover key={item.heading} item={item}/>
      )}
    </div>
    </>
  )
}

export default Cards
