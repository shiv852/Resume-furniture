import { createSlice } from "@reduxjs/toolkit";
// import { default_items } from "../data/items";

const initialState={
  user : null
}

export const userSlice = createSlice({
  name:'user',
  initialState ,
  reducers : {
    setUserDetails :(state,action)=>{
      state.user  = action.payload
      console.log("userDetails",action.payload)
    }
  }, 
  })

  export const {setUserDetails} = userSlice.actions
  export default userSlice.reducer
 
