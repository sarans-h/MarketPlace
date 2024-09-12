import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {clearErrors,forgotPassword} from '../../../features/userSlice'
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {message,error,isUpdated}=useSelector((state)=>state.user)
    const [email, setEmail] = useState("");
    const forgotPasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
       
        myForm.set("email",email);
        
        
        dispatch(forgotPassword(myForm));
      }
      useEffect(() => {
    
        if(error){
            // alert(error);
            toast.error(error);
            dispatch(clearErrors());
          }
        if(message){
            toast.success(message);

        }

      }, [dispatch,message,error]);
  return (
    <>
    <MetaData title="Forgot Password" />
   <div className='h-[100vh] w-[98vw]'>
  <div className="w-2/4 mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg text-center border-black border-1">
    <h2 className="text-2xl font-semibold text-gray-800">
    Forgot Password
    </h2>

    <form  method="POST" className="my-4" encType='multipart/form-data' onSubmit={forgotPasswordSubmit}>
    
     
    <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              required
            />
           
    


      <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-950 transition duration-200">
     Send Email
      </button>
    </form>
    
    
  </div>
</div>
<ToastContainer/>

  </>
  )
}

export default ForgotPassword