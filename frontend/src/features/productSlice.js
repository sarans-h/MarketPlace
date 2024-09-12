import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
    productscount: 0,
    success: false,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        allProductRequest: (state) => {
            state.loading = true;
            state.products = [];
        },
        allProductSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productscount = action.payload.productscount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
        },
        allProductFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.productscount = 0; // Reset count on failure
            state.resultPerPage = 0;
            state.filteredProductsCount = 0;
        },
        productDetailsRequest: (state) => {
            state.loading = true;
            state.product = {};
        },
        productDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
        },
        productDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        adminProductRequest:(state)=>{
            state.loading=true;
            state.products=[];
        },
        adminProductSuccess:(state,action)=>{
            state.loading=false;
            state.products = action.payload.products;
        },
        adminProductFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        newReviewRequest: (state) => {
            state.loading = true;
        },
        newReviewSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload.success; // Correct success payload
        },
        newReviewFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        newReviewReset: (state) => {
            state.success = false;
        },
        newProductRequest:(state)=>{
            state.loading=true;
        },
        newProductSuccess:(state,action)=>{
            state.loading=false;
            state.product=action.payload.product;
            state.success=action.payload.success;
        },
        newProductFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        newProductReset:(state,action)=>{
            state.success=false;
        },
        deleteProductRequest:(state)=>{
            state.loading=true;
        },
        deleteProductSuccess:(state,action)=>{
            state.loading=false;
            state.isDeleted=true;
        },
        deleteProductFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteProductReset:(state,action)=>{
            state.isDeleted=false;
        },
        updateProductRequest:(state)=>{
            state.loading=true;
        },
        updateProductSuccess:(state,action)=>{
            state.loading=false;
            state.isUpdated=true;
        },
        updateProductFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateProductReset:(state,action)=>{
            state.isUpdated=false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    }
});

export const {
    allProductRequest,
    allProductSuccess,
    allProductFail,
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsFail,
    adminProductRequest,
    adminProductSuccess,
    adminProductFail,
    newReviewRequest,
    newReviewSuccess,
    newReviewFail,
    newReviewReset,
    newProductRequest,
    newProductSuccess,
    newProductFail,
    newProductReset,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    deleteProductReset,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    updateProductReset,
    clearErrors
} = productSlice.actions;
// for admin get all products
export const getAdminProduct=()=>async(dispatch)=>{
    try{
        dispatch(adminProductRequest());
        const {data}=await axios.get('/api/v1/admin/products');
        dispatch(adminProductSuccess(data));
    }
    catch(error){
        dispatch(adminProductFail(error.response.data.message));
    }

}
export const deleteProduct=(id)=>async(dispatch)=>{
    try{
        dispatch(deleteProductRequest());
        const {data}=await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess(data.success));
    }
    catch(error){
        dispatch(deleteProductFail(error.response.data.message));
    }

}
// Async action to fetch all products
export const getProducts = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = [0, 5]) => async (dispatch) => {
    try {
        dispatch(allProductRequest());
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings[0]}&ratings[lte]=${ratings[1]}`;
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings[0]}&ratings[lte]=${ratings[1]}`;
        }

        const { data } = await axios.get(link);
        dispatch(allProductSuccess({
            products: data.products,
            productscount: data.productscount,
            resultPerPage: data.resultPerPage,
            filteredProductsCount: data.filteredProductsCount
        }));
    } catch (error) {
        dispatch(allProductFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

// Async action to fetch product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productDetailsRequest());

        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(productDetailsSuccess({ product: data.product }));
    } catch (error) {
        dispatch(productDetailsFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

// Async action to submit a new review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(newReviewRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
        dispatch(newReviewSuccess({ success: data.success }));
    } catch (error) {
        dispatch(newReviewFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const createProduct = (productData) => async (dispatch) => {
    try {
        // console.log(productData)
        dispatch(newProductRequest());

      
      
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData);
        console.log(data.success)
        dispatch(newProductSuccess({ success: data.success, product: data.product }));
    } catch (error) {
        // console.log(error);
        
        dispatch(newProductFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const updateProduct = (id,productData) => async (dispatch) => {
    try {
        dispatch(updateProductRequest());
        
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData);
        dispatch(updateProductSuccess(data));
    } catch (error) {
        
        dispatch(updateProductFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};



export default productSlice.reducer;
