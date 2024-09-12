import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
    success:false,
    reviews:[]
}
const manageReviewsSlice=createSlice({
    name:'manageReviews',
    initialState,
    reducers:{
        allReviewRequest:(state)=>{
            state.loading=true;
        },
        allReviewSuccess:(state,action)=>{
            state.loading=false;
            state.reviews=action.payload;
        },
        allReviewFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteReviewRequest:(state,action)=>{
            state.loading=true;
        },
        deleteReviewSuccess:(state,action)=>{
            state.loading=false;
            state.isDeleted=action.payload;
        },
        deleteReviewFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        deleteReviewReset:(state)=>{
            state.isDeleted=false;
        },
        clearErrors: (state) => {
            state.error = null;
        }

        
    }
})
export const {
    allReviewRequest,
    allReviewSuccess,
    allReviewFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    deleteReviewReset,
    clearErrors

}=manageReviewsSlice.actions;

export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch(allReviewRequest());
        
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
        dispatch(allReviewSuccess(data.reviews));
    } catch (error) {
        dispatch(allReviewFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};

export const deleteReviews = (reviewId,productId) => async (dispatch) => {
    try {
        dispatch(deleteReviewRequest());
        
        const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
        dispatch(deleteReviewSuccess(data.success));
    } catch (error) {
        dispatch(deleteReviewFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};
export default manageReviewsSlice.reducer;
