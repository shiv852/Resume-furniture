import React from "react";
import video from "../videos/1video.mp4";
import "./HeadingVideo.css";
import { useGSAP } from "@gsap/react";
import {gsap} from "gsap"

const HeadingVideo = () => {

  useGSAP(()=>{
    gsap.from(".title1",{
      delay:0.5,
      opacity:0,
      duration:2,
      x:-50, 
    })
  })
  useGSAP(()=>{
    gsap.from(".title2",{
      delay:0.5,
      opacity:1,
      duration:1,
      x:50, 
    })
  })
  useGSAP(()=>{
    gsap.from(".form",{
      delay:0.5,
      opacity:1,
      duration:1,
      y:50, 
    })
  })
  
  return (
    <div className="hero">
      <video id="video" className=" lg:z-0  "
        src={video}
        autoPlay
        loop
        muted
        style={{ width: "100%" }}/>

       <div className="overlay "></div>
       <div className="contentt ">
         <div className="mt-5">
         <h1 className="title1">jaipur furniture</h1>
         <h2 className="title2">Top 1% Location design in worldwide</h2>
         <div className="form ">
            <input type="text" name="text" placeholder="Search here" className="input"/>                
            <button
              className="relative py-2 px-6 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
              Search
            </button>
         </div>
         </div>
       </div>
    </div>
  );
};

export default HeadingVideo;
