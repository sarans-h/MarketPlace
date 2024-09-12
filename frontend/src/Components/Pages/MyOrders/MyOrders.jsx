import React, { useEffect, useState } from 'react';
import MetaData from '../../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors, myOrders } from '../../../features/orderSlice';
const MyOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


  const dispatch=useDispatch();
  const {loading,error,orders}=useSelector((state)=>state.order);
  const {user}=useSelector((state)=>state.user);
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  },[dispatch,error]
  )

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (

   <>
   <MetaData title={"My Orders"}/>
    <div className="container mx-auto my-10 p-5">
      <h2 className="text-3xl font-bold text-center mb-10">My Orders</h2>
      {orders && orders.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center bg-white shadow-md"
            >
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                <h3 className="font-semibold text-sm">
                #{order._id}
                </h3>
                <p className="text-sm text-gray-600">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {order.orderStatus}
                </p>
                <p className="text-sm text-gray-600">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="w-full sm:w-1/3 text-center">
                <p className="text-lg font-semibold text-black">
                  Items Price: ${order.itemsPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  Tax: ${order.taxPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  Shipping: ${order.shippingPrice.toFixed(2)}
                </p>
              </div>
              <div className="w-full sm:w-1/3 text-center sm:text-right">
                <button
                  onClick={() => handleOpenModal(order)}
                  className="inline-block bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>You have no orders yet.</p>
        </div>
      )}

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90%] overflow-y-auto px-6 relative no-scrollbar">
            {/* Modal Header (Fixed at the Top) */}
            <div className="sticky top-0 bg-white z-10 pb-4 border-b-2 border-black">
              <div className="flex justify-between items-center mb-4 pt-3">
                <h2 className="text-2xl font-semibold">Order Details</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="mb-4 mt-5">
              <h3 className="text-lg font-semibold">Shipping Info</h3>
              <hr className="my-2" />
              <p>
                <strong>Address:</strong> {selectedOrder.shippingInfo.address}
              </p>
              <p>
                <strong>City:</strong> {selectedOrder.shippingInfo.city}
              </p>
              <p>
                <strong>State:</strong> {selectedOrder.shippingInfo.state}
              </p>
              <p>
                <strong>Country:</strong> {selectedOrder.shippingInfo.country}
              </p>
              <p>
                <strong>Pincode:</strong> {selectedOrder.shippingInfo.pincode}
              </p>
              <p>
                <strong>Phone No:</strong> {selectedOrder.shippingInfo.phoneNo}
              </p>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Order Items</h3>
              <hr className="my-2" />
              {selectedOrder.orderItems.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Payment Info</h3>
              <hr className="my-2" />
              <p>
                <strong>Payment ID:</strong> {selectedOrder.paymentInfo.id}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.paymentInfo.status}
              </p>
              <p>
                <strong>Paid At:</strong>{' '}
                {new Date(selectedOrder.paidAt).toLocaleString()}
              </p>
            </div>

            {/* Pricing Details */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Pricing Details</h3>
              <hr className="my-2" />
              <p>
                <strong>Items Price:</strong> ${selectedOrder.itemsPrice}
              </p>
              <p>
                <strong>Tax Price:</strong> ${selectedOrder.taxPrice}
              </p>
              <p>
                <strong>Shipping Price:</strong> ${selectedOrder.shippingPrice}
              </p>
              <p>
                <strong>Total Price:</strong> ${selectedOrder.totalPrice}
              </p>
            </div>

            {/* Order Status */}
            <div>
              <h3 className="text-lg font-semibold">Order Status</h3>
              <hr className="my-2" />
              <p>
                <strong>Status:</strong> {selectedOrder.orderStatus}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    <ToastContainer/>
   </>
  );
};

export default MyOrders;

