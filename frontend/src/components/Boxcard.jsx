
import gsap from "gsap"
import "./Boxcard.css"
import {useGSAP} from '@gsap/react'
import { useRef } from "react"
import { Link } from "react-router-dom"
import { IoIosArrowRoundForward } from "react-icons/io";
function Boxcard(){
    

   const imgRef= useRef()
   const img2Ref = useRef()
   const img3Ref = useRef()

    useGSAP(()=>{
        gsap.from( imgRef.current,{
            delay:0.4,
            opacity:0,
            duration:1,
            y:60,    
        })
    })
    useGSAP(()=>{
        gsap.from( img2Ref.current,{
            delay:0.4,
            opacity:10,
            duration:1,
            x:60,    
        })
    })
    useGSAP(()=>{
        gsap.from( img3Ref.current,{
            delay:0.4,
            opacity:0,
            duration:1,
            y:-60,    
        })
    })

 useGSAP(()=>{
        gsap.from( "#main h1",{
            delay:0.4,
            opacity:0,
            duration:1,
           
        })
    })
    
return<>
<div className=" hidden md:block">
   <div id="main" className=" mb-28 mt-28 flex flex-col justify-center h-full w-full relative items-center ">
    <div id="nav " className="w-[100%] h-[100%] ">
        <h1 className="relative z-10 size-[5.4vw]  w-[30%] h-full text-center m-auto uppercase" style={{fontWeight:"100"}}>Jaipur best <span className="z-10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> furniture </h1>


        <div className="shopnow  relative top-28   h-[50%]  w-[100%] ">             
        <Link to="/products" className="no-underline">
            <button className="cta  mx-auto  flex flex-row">
                 <span className=" hover-underline-animation "style={{fontSize:"18px"}} > Shop now </span>
                 <IoIosArrowRoundForward className="text-black" size={34}/> 
            </button>
        </Link>
        </div>
        <Link to="/products">
         <img ref={imgRef} className="rounded-sm h-[320px] w-[235px] left-[19%] top-[-25%] absolute" src="images/52.png" alt="" id="img1" />
        <img ref={img2Ref} className="z-0 rounded-sm h-[180px] w-[208px] right-[29%] top-[-21%] absolute" src="images/56.png" alt="" id="img3" /> 
        <img ref={img3Ref} className="rounded-sm h-[200px] w-[220px] right-[-72%] top-[42px] relative " src="images/img11.jpg" alt="" />
        </Link> 
        
    </div>
   </div>
</div>
</>
}
export default Boxcard
