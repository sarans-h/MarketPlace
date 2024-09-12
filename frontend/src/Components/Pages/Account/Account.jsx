import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import Loader from "../../Loader/Loader";
import { loadUser } from "../../../features/userSlice";

function Account() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="min-h-screen bg-white flex items-center justify-center py-12">
            <div className="bg-white shadow-lg border border-black rounded-lg max-w-4xl w-full p-10  text-center">
              {/* Profile Header */}
              <div className="flex flex-col items-center mb-8">
                <img
                  className="h-40 w-40 rounded-full border-2 border-black mb-4 transform transition-transform duration-500 hover:scale-110"
                  src={user.avatar.url}
                  alt={user.name}
                />
                <h1 className="text-4xl font-bold text-black mb-2">{user.name}</h1>
                <Link
                  to="/me/update"
                  className="mt-6 bg-black text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300 mb-4 transform hover:translate-y-1"
                >
                  Update Profile
                </Link>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8 text-center">
                <div className="transition-all duration-500 transform hover:translate-x-2">
                  <h2 className="text-2xl font-semibold text-black mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium text-black">Full Name</h4>
                      <p className="text-black">{user.name}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-black">Email</h4>
                      <p className="text-black">{user.email}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-black">Joined On</h4>
                      <p className="text-black">{String(user.createdAt).substring(0, 10)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="transition-all duration-500 transform hover:translate-x-2">
                  <h2 className="text-2xl font-semibold text-black mb-4">Actions</h2>
                  <div className="space-y-4">
                    <Link
                      to="/cart"
                      className="block text-lg font-medium text-black hover:underline transition-all duration-300"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/password/update"
                      className="block text-lg font-medium text-black hover:underline transition-all duration-300"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Account;
