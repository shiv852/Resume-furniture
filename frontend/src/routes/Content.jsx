
import React from 'react'
// import "./contact.css"

const Content = () => {
  return (
    
    <form>
      <div className="container bg-red-600 w-[100%] h-[100%] flex justify-center items-center">
          <div class="w-60 h-12 relative flex rounded-xl ">
          <input
            required=""
            class="peer  w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
            id="address"
            type="text"/>
          <label
            class="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
            for="address"
          >
            Email Address</label >
        </div>
      </div>
    </form>
  
  )
}

export default Content
