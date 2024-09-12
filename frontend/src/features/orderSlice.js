import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  order: null,
  error: null,
  isDeleted:false,
  isUpdated:false,
  orders:[]
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    myOrdersRequest:(state)=>{
      state.loading = true;
    },
    myOrdersSuccess:(state,action)=>{
      state.loading=false;
      state.orders=action.payload;
    },   
    myOrdersFail:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    },
    
    allOrdersRequest:(state)=>{
      state.loading=true;
    },
    allOrdersSuccess:(state,action)=>{
      state.loading=false;
      state.orders=action.payload;
    },
    allOrdersFail:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    },
    
    updateOrderRequest:(state)=>{
      state.loading=true;
    },
    updateOrderSuccess:(state,action)=>{
      state.loading=false;

      state.isUpdated=true;
    },
    updateOrderFail:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    },
    updateOrderReset:(state)=>{
      state.isUpdated=false;
    },
    
    deleteOrderRequest:(state)=>{
      state.loading=true;
    },
    deleteOrderSuccess:(state,action)=>{
      state.loading=false;
      state.isDeleted=true;
    },
    deleteOrderFail:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    },
    deleteOrderReset:(state)=>{
      state.isDeleted=false;
    },


    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const { createOrderRequest, createOrderSuccess, createOrderFail,myOrdersRequest,myOrdersSuccess,myOrdersFail,allOrdersRequest,allOrdersSuccess,allOrdersFail,updateOrderRequest,updateOrderSuccess,updateOrderFail,updateOrderReset,deleteOrderRequest,deleteOrderSuccess,deleteOrderFail,deleteOrderReset, clearErrors } = orderSlice.actions;

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(createOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    console.log("Error occurred:", error); 
    dispatch(createOrderFail(
      error.response?.data?.message || error.message || "Something went wrong"
    ));
  }
};


export const myOrders=()=>async(dispatch,getState)=>{
  try {
    dispatch(myOrdersRequest());
    const { data } = await axios.get("/api/v1/orders/me");
    dispatch(myOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(myOrdersFail(
      error.response?.data?.message || error.message || "Something went wrong"
    ));
  }

}


export const getallOrders=()=>async(dispatch,getState)=>{
  try {
    dispatch(allOrdersRequest());
    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch(allOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(allOrdersFail(
      error.response?.data?.message || error.message || "Something went wrong"
    ));
  }

}

export const updateOrder = (id,order) => async (dispatch, getState) => {
  try {
    dispatch(updateOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);
    dispatch(updateOrderSuccess(data.success));
  } catch (error) {
    // console.log("Error occurred:", error); 
    dispatch(updateOrderFail(
      error.response?.data?.message || error.message || "Something went wrong"
    ));
  }
};
export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteOrderRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch(deleteOrderSuccess(data.success));
  } catch (error) {
    // console.log("Error occurred:", error); 
    dispatch(deleteOrderFail(
      error.response?.data?.message || error.message || "Something went wrong"
    ));
  }
};
export default orderSlice.reducer;
