import React, { useEffect } from 'react';
import DropdownMenu from '../Dashboard/DropdownMenu.jsx';
import Loader from '../../Loader/Loader';
import MetaData from '../../layout/MetaData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers,clearErrors, deleteUser, deleteUserReset, updateUser, updateUserReset } from '../../../features/useManagementSlice.js';
import { updateOrderReset } from '../../../features/orderSlice.js';

function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users, loading ,isDeleted,isUpdated} = useSelector((state) => state.userManagement);


useEffect(() => {
    if (error) {
        toast.error(error); // Handle errors separately
        dispatch(clearErrors()); // Clear the error after showing it
    }
    if(isDeleted){
      toast.success('User deleted successfully');
      dispatch(deleteUserReset());
    }
    if(isUpdated){
      toast.success('user updated successfully');
      dispatch(updateUserReset());
    }
    dispatch(getAllUsers())
}, [error, dispatch,isDeleted,isUpdated]); 
const deletehandler=(id)=>{
  dispatch(deleteUser(id));
}
const markHandler=(id)=>{
  dispatch(updateUser(id,{role:"admin"}))
}
  return (
    <>
      <MetaData title={"All Users"} />
      <div className="p-6 lg:p-8 mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">All Users</h2>
          <DropdownMenu />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users && users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user._id}
                  className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-black"
                >
                  <img
                    src={user.avatar.url}
                    alt="user"
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-gray-600">ID: {user._id}</p>
                  <p className={user.role==="admin"?"text-green-500":"text-gray-600"}>Role: {user.role}</p>

                  <div className="flex justify-between mt-4">
                     {user.role==="user"&& <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200" onClick={()=>markHandler(user._id)}>
                        Make Admin
                      </button>}
                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
                    onClick={()=>deletehandler(user._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
}

export default UsersList;
