import React, { useEffect, useState } from 'react';
import {clearErrors,loginUser,registerUser} from '../../../features/userSlice'
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate, useSearchParams } from 'react-router-dom';
import im from "../../../assets/profile.webp"
const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [searchParams] = useSearchParams();
  const toggleMode = () => {
    setIsLogin(!isLogin);
  };
  const redirect =  searchParams.get('redirect') || '/account';


  const {error,loading,isAuthenticated}=useSelector((state)=>state.user)
  const [user ,setUser]=useState({
    name:"",
    email:"",
    password:""
  });
  const {name,email,password}=user;
  const [avatar, setAvatar] = useState(im);
  const [avatarPreview, setAvatarPreview] = useState(im);

  const dataChange=(e)=>{
    if(e.target.name==="avatar"){
      const reader=new FileReader();
      reader.onload=()=>{
        if(reader.readyState===2){
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }else{

      setUser({...user,[e.target.name]:e.target.value})
    }
  }
  const loginSubmit=(e)=>{
    // console.log('Login Attempt:', { email, password });
    e.preventDefault();
    dispatch(loginUser({email,password}));
  }
  const registerSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("avatar", avatar);
    // const userData={name,email,password}
    // console.log(myForm.name);
    
    dispatch(registerUser(myForm));
  }
  useEffect(() => {
    if(error){
      alert(error);
      dispatch(clearErrors())
    }
    if(isAuthenticated){
      navigate(redirect)
    }
  }, [dispatch,error,isAuthenticated,redirect,navigate])
  
  return (
    <div className='h-[100vh] w-[98vw]'>
      <div className="w-2/4 mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg text-center border-black border-1">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form  method="POST" className="my-4" encType='multipart/form-data' onSubmit={isLogin?loginSubmit:registerSubmit}>
        {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              onChange={dataChange}
              value={name}
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={dataChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            value={password}
            onChange={dataChange}
            required
          />
          {!isLogin && (
 <div className="relative">
 {/* Hidden file input */}
 <input
   type="file"
   id="file-input"
   className="w-full p-3 border border-gray-300 rounded-lg mb-4"
   accept="image/*"
   name='avatar'
   onChange={dataChange}
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

          )}


          <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-950 transition duration-200">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <p
          className="mt-4 text-gray-600 cursor-pointer hover:underline"
        >
{isLogin?           <Link to="/password/forgot">Forget Password ?</Link>:""}</p>
<p
          onClick={toggleMode}
          className="mt-4 text-gray-600 cursor-pointer hover:underline"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
