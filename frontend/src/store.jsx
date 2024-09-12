// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import  userReducer  from './features/userSlice';
import cartReducer from "./features/cartSlice.js"
import orderReducer  from "./features/orderSlice.js"
import userManagementReducer from "./features/useManagementSlice.js"
import manageReviewsReducer from "./features/manageReviewsSlice.js"
const preloadedState = {
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {},
    },
    // Add other initial states here if needed
};
const store = configureStore({
    reducer: {
        product: productReducer,
        user:userReducer,
        cart: cartReducer,
        order:orderReducer,
        userManagement: userManagementReducer,
        manageReviews:manageReviewsReducer
    },
    preloadedState,
});

export default store;
 