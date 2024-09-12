import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {clearErrors,resetPassword,resetPasswordReset} from '../../../features/userSlice'
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
function ResetPassword() {
 
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {error,success}=useSelector((state)=>state.user)
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();
  
    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword);
  
  
        // const userData={name,email,password}
        // console.log(myForm.name);
        
        dispatch(resetPassword(token,myForm));
      }
      useEffect(() => {
        
    
        if(error){
            // alert(error);
            toast.error(error);
            dispatch(clearErrors());
          }
        if(success){
            toast.success("Password Updated");
            
            navigate("/loginsignup");
  
        }
  
      }, [dispatch, error, navigate,success]);
      
    return (
      <>
      <MetaData title="Reset Password" />
     <div className='h-[100vh] w-[98vw]'>
    <div className="w-2/4 mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg text-center border-black border-1">
      <h2 className="text-2xl font-semibold text-gray-800">
        Update Profile
      </h2>
  
      <form  method="POST" className="my-4"  onSubmit={resetPasswordSubmit}>
      
       
      
       
             <input
              type="password"
              name="password"
              placeholder="New Password"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            /> <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            
            required
          />
  
      
  
  
        <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-950 transition duration-200">
       Update Password
        </button>
      </form>
      
      
    </div>
  </div>
  <ToastContainer/>
  
    </>
  )
}

export default ResetPassword