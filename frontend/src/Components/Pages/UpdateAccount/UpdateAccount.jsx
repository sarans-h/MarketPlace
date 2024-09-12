import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {clearErrors,updateProfile, updateProfileReset,updateProfileFail,updateProfileSuccess,loadUser} from '../../../features/userSlice'
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useSearchParams } from 'react-router-dom';
import im from "../../../assets/profile.webp"
import MetaData from '../../layout/MetaData';
const UpdateAccount = () => {
    const [isLogin, setIsLogin] = useState(false);
 
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.user)
    const {error,isUpdated}=useSelector((state)=>state.user)
    const [avatar, setAvatar] = useState(im);
    const [avatarPreview, setAvatarPreview] = useState(im);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const updateProfileDataChange =(e)=>{
   
          const reader=new FileReader();
          reader.onload=()=>{
            if(reader.readyState===2){
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          }
          reader.readAsDataURL(e.target.files[0]);
        }
      

      const updateProfileSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        
        myForm.set("avatar", avatar);
        // const userData={name,email,password}
        // console.log(myForm.name);
        
        dispatch(updateProfile(myForm));
      }
      useEffect(() => {
        if (user) {
          setName(user.name);
          setEmail(user.email);
          setAvatarPreview(user.avatar.url);
        }
    
        if(error){
            // alert(error);
            toast.error(error);
            dispatch(clearErrors());
          }
        if(isUpdated){
            toast.success("Profile Updated");
            dispatch(loadUser());
            navigate("/account");
            dispatch(updateProfileReset())

        }

      }, [dispatch, error, alert, navigate, user,isUpdated]);
      
    return (
        <>
          <MetaData title="Update Profile" />
         <div className='h-[100vh] w-[98vw]'>
        <div className="w-2/4 mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg text-center border-black border-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            Update Profile
          </h2>
  
          <form  method="POST" className="my-4" encType='multipart/form-data' onSubmit={updateProfileSubmit}>
          {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            )}
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              required
            />
           
          
   <div className="relative">
   {/* Hidden file input */}
   <input
     type="file"
     id="file-input"
     className="w-full p-3 border border-gray-300 rounded-lg mb-4"
     accept="image/*"
     name='avatar'
     onChange={updateProfileDataChange}
   />
   
   {/* Label with image preview */}
   <label
     htmlFor="file-input"
     className="flex items-center justify-center w-8 h-8 absolute  bg-gray-200 border border-gray-300 rounded-full cursor-pointer  right-2 top-3"
   >
     <img
       src={avatarPreview}
       alt="Preview"
       className=" w-full h-full object-cover rounded-full"
     />
   </label>
  </div>
  
          
  
  
            <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-950 transition duration-200">
           Update Profile
            </button>
          </form>
          
          
        </div>
      </div>
     <ToastContainer/>

        </>
       
  )
}

export default UpdateAccount
