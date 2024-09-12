// User Management Slice
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialUserManagementState = { users: [], userDetails: {}, loading: false, isDeleted: false, error: null , isUpdated:false};

const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState: initialUserManagementState,
    reducers: {
        allUserRequest: (state) => {
            state.loading = true;
        },
        allUserSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        allUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userDetailsRequest: (state) => {
            state.loading = true;
        },
        userDetailsSuccess: (state, action) => {
            state.loading = false;
            state.userDetails = action.payload;
        },
        userDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserRequest: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
        },
        deleteUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserReset: (state) => {
            state.isDeleted = false;
        },
        updateUserRequest:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.loading = false;
            state.isUpdated = true;
        },
        updateUserFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateUserReset:(state)=>{
            state.isUpdated = false;
        },
        clearErrors: (state) => {
            state.error = null;
        }
    }
});

export const { 
    allUserRequest, allUserSuccess, allUserFail, userDetailsRequest, userDetailsSuccess, userDetailsFail, 
    deleteUserRequest, deleteUserSuccess, deleteUserFail, deleteUserReset, clearErrors ,  
    updateUserRequest,
    updateUserSuccess,
    updateUserFail,
    updateUserReset,
} = userManagementSlice.actions;

// Get All Users Thunk
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(allUserRequest());
        const { data } = await axios.get('/api/v1/admin/users');
        dispatch(allUserSuccess(data.users));
    } catch (error) {
        dispatch(allUserFail(error.response?.data?.message || error.message));
    }
};

// Delete User Thunk
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());
        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess(data));
    } catch (error) {
        dispatch(deleteUserFail(error.response?.data?.message || error.message));
    }
};

// Get User Details Thunk
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch(userDetailsRequest());
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userDetailsSuccess(data.user));
    } catch (error) {
        dispatch(userDetailsFail(error.response?.data?.message || error.message));
    }
};
export const updateUser = (id,userData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/admin/user/${id}`,userData,config);

        dispatch(updateUserSuccess(data.success));
    } catch (error) {
        dispatch(updateUserFail(error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message));
    }
};


export default userManagementSlice.reducer;
