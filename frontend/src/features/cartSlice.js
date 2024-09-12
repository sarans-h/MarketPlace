import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState={
    cartItems:[],
    shippingInfo:{}
};
const cartSlice=createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;
            const isItemExist=state.cartItems.find(
                (i)=>i.product===item.product
            )
            
            if (isItemExist) {
                state.cartItems = state.cartItems.map(i =>
                    i.product === isItemExist.product ? item : i
                );
            } else {
                state.cartItems.push(item);
            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.product !== action.payload);
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        },

    }
})
export const {addToCart,removeCartItem,saveShippingInfo}=cartSlice.actions;

export const addItemsToCart = (id,quantity) => async (dispatch,getState) => {
   
        const { data } = await axios.get(`/api/v1/product/${id}`);
        const item = {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
          };
        dispatch(addToCart(item));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    
};

export const removeItemsFromCart = (id) => async (dispatch,getState) => {
    dispatch(removeCartItem(id));
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}

export const saveShippingInformation = (data) => async (dispatch,getState) => {
    dispatch(saveShippingInfo(data));
    localStorage.setItem("shippingInfo",JSON.stringify(data));
}

export default cartSlice.reducer;