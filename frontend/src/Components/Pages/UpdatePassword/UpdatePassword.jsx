import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {clearErrors,updatePassword,updatePasswordReset} from '../../../features/userSlice'
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
function UpdatePassword() {
 
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {error,isUpdated}=useSelector((state)=>state.user)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const updatePasswordSubmit=(e)=>{
      e.preventDefault();
      const myForm=new FormData();
      myForm.set("oldPassword",oldPassword);
      myForm.set("newPassword",newPassword);
      myForm.set("confirmPassword",confirmPassword);


      // const userData={name,email,password}
      // console.log(myForm.name);
      
      dispatch(updatePassword(myForm));
    }
    useEffect(() => {
      
  
      if(error){
          // alert(error);
          toast.error(error);
          dispatch(clearErrors());
        }
      if(isUpdated){
          toast.success("Profile Updated");
          
          navigate("/account");
          dispatch(updatePasswordReset())

      }

    }, [dispatch, error, navigate,isUpdated]);
    
  return (
    <>
    <MetaData title="Change Password" />
   <div className='h-[100vh] w-[98vw]'>
  <div className="w-2/4 mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg text-center border-black border-1">
    <h2 className="text-2xl font-semibold text-gray-800">
      Update Profile
    </h2>

    <form  method="POST" className="my-4"  onSubmit={updatePasswordSubmit}>
    
     
    
     <input
            type="password"
            name="password"
            placeholder="Old Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            
            required
          />
           <input
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
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

export default UpdatePassword