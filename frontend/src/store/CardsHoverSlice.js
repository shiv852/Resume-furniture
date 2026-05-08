import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_ITEMS } from "../data/CardsHover";



const cardshoverSlice=createSlice({
    name:"cardhoveritems",
    initialState:DEFAULT_ITEMS,
    reducers:{
        addInitialItems:(store , action)=>
        {
            return store;
        }
    }
})
export const cardhoverActions=cardshoverSlice
export default cardshoverSlice;