import { configureStore } from "@reduxjs/toolkit";
import cardshoverSlice from "./CardsHoverSlice";

import userReducer from './userSlice'
// fetchStatus ko use ham krenge fetchitems.jsx 

const furnitureStore=configureStore({
    reducer:{
        cardhoveritems:cardshoverSlice.reducer,
        user : userReducer
    }
})
export default furnitureStore;