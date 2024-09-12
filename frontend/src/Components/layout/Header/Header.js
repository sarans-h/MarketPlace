import React, { useState } from 'react';
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar
} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AcmeLogo } from "./AcmeLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import { CartIcon } from "./CartIcon.jsx";
import { NavLink, useLocation,useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import im from "../../../assets/profile.webp"
import { logoutUser } from '../../../features/userSlice.js';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {user,isAuthenticated}=useSelector((state)=>state.user)
  const pic=isAuthenticated?user.avatar.url:im;

  const navigate=useNavigate();
  const isActive = (path) => location.pathname === path;
const [keyword,setKeyword]=useState("");
const searchSubmitHandler=(e)=>{
  e.preventDefault();
  if(keyword.trim()){
    navigate(`/products/${keyword}`);;

  }else navigate("/products")
}

function out(){
dispatch(logoutUser());
toast.success("Logged out successfully");
navigate("/");
}
function orders(){
  navigate("/orders");
}
function profile(){
  navigate("/account");
}
  return (
    <>
    <Navbar isBordered>
      <NavbarContent justify="start" className='lg:hidden md:hidden sm:flex'>
       <Dropdown >
          <DropdownTrigger>
            <Avatar
                as="button"
                className="transition-transform text-white bg-transparent"
                style={{ color: 'white' }}
              size="lg"
              src="data:image/svg+xml,%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='60px' height='60px' viewBox='0 0 500 500' preserveAspectRatio='xMidYMid meet'%3E%3Cg transform='matrix(.1 0 0 -.1 0 500)' fill='%23000000' stroke='none'%3E%3Cpath d='M1808 3434c-70 -39 -106 -64 -98 -69 7 -4 59 -4 116 -1l103 7 -6 -147c-5 -125 -4 -146 8 -139 8 5 49 37 92 72 42 34 88 70 102 79 22 15 25 23 25 80v64l28 -5c15 -2 60 -7 100 -10s100 -14 133 -25c48 -17 70 -19 108 -12l48 9 34 -64c31 -58 32 -65 17 -74 -14 -8 -15 -14 -6 -40 6 -17 8 -71 6 -122 -5 -101 -26 -163 -78 -229 -17 -20 -30 -39 -30 -42s24 -6 53 -6c45 0 63 6 113 38 99 64 161 150 190 261 39 153 -35 306 -183 376 -109 51 -163 58 -477 59l-288 1z' /%3E%3Cpath d='M2399 3246c-129 -12 -195 -34 -259 -86l-25 -20 65 6c36 3 71 7 78 9 9 4 12 -40 12 -195v-200h170v133c0 72 3 169 7 214l6 82 51 27c95 49 97 49 -105 30' /%3E%3Cpath d='m2024 3053 -102 -15 -6 -37c-3 -20 -6 -82 -6 -138v-103h230v124c0 68 3 138 6 155 5 23 3 31 -7 30 -8 -1 -60 -8 -115 -16' /%3E%3Cpath d='M1965 2694c6 -2 9 -34 7 -79l-4 -75 28 1c18 1 22 3 11 6 -15 4 -17 14 -15 71 2 52 7 67 19 70 23 4 32 -28 14 -48 -14 -16 -14 -18 6 -23 18 -5 21 -11 15 -38 -5 -27 -4 -30 9 -19 19 16 19 45 1 62 -9 9 -10 17 -3 29 20 32 1 49 -50 48 -26 0 -43 -3 -38 -5' /%3E%3Cpath d='M2118 2633c2 -38 8 -74 14 -80 12 -15 64 -17 72 -4 3 4 -5 6 -17 4 -36 -7 -49 18 -45 87 2 48 0 60 -12 60s-14 -13 -12 -67' /%3E%3Cpath d='M2225 2620c0 -64 3 -80 15 -80s14 14 12 80c-2 53 -8 80 -15 80 -8 0 -12 -25 -12 -80' /%3E%3Cpath d='M2325 2658c14 -25 25 -59 25 -80 0 -33 3 -38 23 -37 12 0 16 3 10 6 -21 8 -15 57 13 107 22 39 23 46 9 46 -9 0 -13 -4 -10 -10 3 -5 0 -22 -8 -37l-14 -27 -24 37c-34 52 -54 47 -24 -5' /%3E%3Cpath d='M2548 2620c2 -53 8 -80 15 -80 8 0 12 25 12 80 0 64 -3 80 -15 80s-14 -14 -12 -80' /%3E%3Cpath d='m2649 2693 34 -4 -5 -75c-4 -59 -2 -74 9 -74 8 0 11 5 8 10 -4 6 -3 39 0 75 7 62 8 64 39 68 17 2 -3 4 -44 4s-60 -2 -41 -4' /%3E%3Cpath d='M1896 2378c-3 -51 -9 -194 -15 -318 -10 -246 -21 -303 -68 -353l-28 -29 230 5c181 5 249 10 320 27 353 80 562 224 635 436 26 74 28 190 6 268l-17 56h-134c-74 0 -135 -2 -135 -4s11 -26 25 -53c78 -151 36 -397 -90 -532 -75 -80 -113 -94 -263 -93 -70 0 -178 4 -240 7l-113 7 24 27c60 64 74 127 87 390 5 112 10 215 10 227 0 24 -1 24 -114 24h-114z' /%3E%3Cpath d='M2275 2458c-2 -7 -5 -103 -7 -213 -3 -183 -5 -204 -26 -250 -13 -27 -34 -62 -48 -76l-25 -26 109 -7c81 -5 119 -3 148 7 41 14 169 96 161 103 -2 2 -28 0 -57 -6 -65 -12 -170 -13 -170 -1 0 5 6 14 14 20 35 29 49 102 54 284l4 177h-76c-52 0 -78 -4 -81 -12' /%3E%3C/g%3E%3C/svg%3E"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem > <NavLink  to="/" >
          
          <NavbarItem isActive={isActive('/')}>
          BuyIt
          </NavbarItem>
          </NavLink></DropdownItem>
            <DropdownItem > <NavLink  to="/home" >
          
          <NavbarItem isActive={isActive('/home')}>
              Home
          </NavbarItem>
          </NavLink></DropdownItem>
            <DropdownItem ><NavLink  to="/products" >
          
          <NavbarItem isActive={isActive('/products')}>
              Products
          </NavbarItem>
          </NavLink></DropdownItem>
            <DropdownItem ><NavLink  to="/contact" >
          
          <NavbarItem isActive={isActive('/contact')}>
              Contact
          </NavbarItem>
          </NavLink></DropdownItem>
            <DropdownItem > <NavLink  to="/about" >
          
          <NavbarItem isActive={isActive('/about')}>
              About
          </NavbarItem>
          </NavLink></DropdownItem>
           
          </DropdownMenu>
        </Dropdown>
        </NavbarContent>

      <NavbarContent justify="start" className='hidden md:flex gap-10 w-full justify-end'>
        <NavbarBrand className="mr-4">
          <AcmeLogo className="sm:hidden" />
          <NavLink color="foreground" to="/">
          <p className="hidden md:block font-bold text-inherit">BuyIt</p>
          </NavLink>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex gap-10 w-full justify-end" >
        <NavLink  to="/home" >
          
          <NavbarItem isActive={isActive('/home')}>
              Home
          </NavbarItem>
          </NavLink>

          <NavLink  to="/products" >
          
          <NavbarItem isActive={isActive('/products')}>
              Products
          </NavbarItem>
          </NavLink>
          <NavLink  to="/contact" >
          
          <NavbarItem isActive={isActive('/contact')}>
              Contact
          </NavbarItem>
          </NavLink>
          <NavLink  to="/about" >
          
          <NavbarItem isActive={isActive('/about')}>
              About
          </NavbarItem>
          </NavLink>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
      <form onSubmit={searchSubmitHandler}>
  <Input
    classNames={{
      base: "max-w-full sm:max-w-[10rem] h-10",
      mainWrapper: "h-full",
      input: "text-small",
      inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
    }}
    onChange={(e) => setKeyword(e.target.value)}
    placeholder="Type to search..."
    size="sm"
    startContent={<SearchIcon size={18} />}
    type="search"
  />
  <Input
    type="submit"
    value="Search"
    className="hidden" // Tailwind class to hide the submit button
  />
</form>

          
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={pic}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">

           
           {
            user&&user.role==="admin"&&<DropdownItem key="dashboard">
            <NavLink to="/admin/dashboard">
             Dashoard
            </NavLink>
             </DropdownItem>

           }
            {
              isAuthenticated?(<DropdownItem key="account">
                <NavLink to="/account">
                <span>Logged in as</span>
                 {user.name}
                </NavLink>
                 </DropdownItem>):(<DropdownItem key="loginsignup">
                <NavLink to="/loginsignup">
                 Login/Signup
                </NavLink>
                 </DropdownItem>
              )
            }
            
            
            {
              isAuthenticated?( <DropdownItem key="orders" onClick={orders} >My orders</DropdownItem>
              ):(null
              )
            }
                        {
              isAuthenticated?(             <DropdownItem key="profile" onClick={profile}>My Profile</DropdownItem>
              ):(null
              )
            }            {
              isAuthenticated?(  <DropdownItem key="logout" color="danger" onClick={out}>
                Log Out
  
              </DropdownItem>):(null
              )
            }
          </DropdownMenu>
        </Dropdown>

  <NavLink to="/cart">
    
        <CartIcon />
    </NavLink>    
      </NavbarContent>
    </Navbar>

    <ToastContainer/>
    </>
  );
};

export default Header;
