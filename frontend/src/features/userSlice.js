import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { user: {}, loading: false,isUpdated:false, isAuthenticated: false, error: null,users:[],userDetails:{} };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        authFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.user=null;
        },
        loadUserRequest:(state)=>{
            state.loading=true;
            state.isAuthenticated=false;
        },
        loadUserSuccess:(state,action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
        },
        loadUserFail:(state,action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
            state.user=null;
        },
        logoutSuccess:(state)=>{
            state.loading=false;
            state.user=null;
            state.isAuthenticated=false;

        },
        logoutFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },

        updateProfileRequest:(state)=>{
            state.loading=true;
        },
        updateProfileSuccess:(state,action)=>{
            state.loading = false;
            state.isUpdated = true; 
        },
        updateProfileFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateProfileReset:(state,action)=>{
            state.isUpdated=false;
        },
        updatePasswordRequest:(state,action)=>{
            state.loading=true;
        },
        updatePasswordSuccess:(state,action)=>{
            state.loading = false;
            state.isUpdated = true; 
        },
        updatePasswordFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updatePasswordReset:(state,action)=>{
            state.isUpdated=false;
        },
        forgotPasswordRequest:(state,action)=>{
            state.loading=true;
            state.error=null;
        },
        forgotPasswordSuccess:(state,action)=>{
            state.loading = false;
            state.message=action.payload;

        },
        forgotPasswordFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        resetPasswordRequest:(state,action)=>{
            state.loading=true;
            state.error=null;
        },
        resetPasswordSuccess:(state,action)=>{
            state.loading = false;
            state.success=action.payload;
        },
        resetPasswordFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
       
        

        clearErrors: (state) => {
            state.error = null;
        }
    }
});

export const { authRequest,
    authSuccess,
    authFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updateProfileReset,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    updatePasswordReset,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    
    
  


    clearErrors } = userSlice.actions;

export const loginUser = ({email,password}) => async (dispatch) => {
    try {
        dispatch(authRequest());
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post('/api/v1/login', 
            {email,password},
            config            
        );

        dispatch(authSuccess(data.user));
    } catch (error) {
        dispatch(authFail(error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message));
    }
};
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout');

        dispatch(logoutSuccess()); // No payload needed if we're setting user to null
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        dispatch(logoutFail(errorMessage));
    }
};
export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(authRequest());
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post('/api/v1/register', userData,config);

        dispatch(authSuccess(data.user));
    } catch (error) {
        dispatch(authFail(error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message));
    }
};

export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch(loadUserRequest());
        const {data}=await axios.get(
            '/api/v1/me',
        )
        dispatch(loadUserSuccess(data.user));

    }catch(error){
        
       

        dispatch(loadUserFail(error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message));
            
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put('/api/v1/me/update', userData,config);

        dispatch(updateProfileSuccess(data.success));
    } catch (error) {
        dispatch(updateProfileFail(error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message));
    }
};

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put('/api/v1/password/update', passwords,config);

        dispatch(updatePasswordSuccess(data.success));
    } catch (error) {
        dispatch(updatePasswordFail(error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message));
    }
};


export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post('/api/v1/password/forgot', 
            email,
            config            
        );

        dispatch(forgotPasswordSuccess(data.message));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message));
    }
};

export const resetPassword = (token,passwords) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, 
            passwords,
            config            
        );

        dispatch(resetPasswordSuccess(data.success));
    } catch (error) {
        dispatch(resetPasswordFail(error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message));
    }
};





export default userSlice.reducer;
