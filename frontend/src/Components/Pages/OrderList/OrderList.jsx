import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { getallOrders, clearErrors, deleteOrder, deleteOrderReset, updateOrderReset } from '../../../features/orderSlice';
import MetaData from '../../layout/MetaData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownMenu from '../Dashboard/DropdownMenu.jsx'; // Import DropdownMenu
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { updateOrder } from '../../../features/orderSlice';
function OrderList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const dispatch = useDispatch();
  const { loading, orders, error,isDeleted,isUpdated } = useSelector((state) => state.order);
  const deleteOrderHandler=(id)=>{
    dispatch(deleteOrder(id));
  }
  const navigate=useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if(isDeleted){
      toast.success('Order deleted successfully');
      dispatch(deleteOrderReset());
    }
    if(isUpdated){
      toast.success('Order updated successfully');
      dispatch(updateOrderReset());
    }
    dispatch(getallOrders())
  }, [dispatch, error,isDeleted,isUpdated]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  const deliverOrderHandler = (id) => {
    dispatch(updateOrder(id, { status: 'Delivered' }));
  };

  return (
    <>
      <MetaData title={"All Orders"} />
      <div className="p-6 lg:p-8 mx-auto max-w-6xl">
        {/* Header with DropdownMenu */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">All Orders</h2>
          <DropdownMenu />
        </div>

        {loading ? (
          <Loader />
        ) : orders.length===0 ? (
          <div className="min-w-full text-center border-collapse">

          <h2 className="text-3xl font-bold m-auto ">No Orders</h2>
</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse border-2 border-black shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border border-gray-200">Order ID</th>
                  <th className="py-2 px-4 border border-gray-200">Status</th>
                  <th className="py-2 px-4 border border-gray-200">Total</th>
                  <th className="py-2 px-4 border border-gray-200">Date</th>
                  <th className="py-2 px-4 border border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border border-gray-200">#{order._id}</td>
                    <td className={`py-2 px-4 border border-gray-200 ${order.orderStatus === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {order.orderStatus}
                    </td>
                    <td className="py-2 px-4 border border-gray-200">${order.totalPrice.toFixed(2)}</td>
                    <td className="py-2 px-4 border border-gray-200">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border border-gray-200">
  <button
    onClick={() => handleOpenModal(order)}
    className="inline-block bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
  >
    View Details
  </button>
  {/* Static Edit Button */}
 {order.orderStatus==="Processing"&& <button
  onClick={() => deliverOrderHandler(order._id)}
    className="inline-block  bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
  >
    Deliver
  </button>}
  {order.orderStatus==="Processing"&&
  <button
    onClick={()=>deleteOrderHandler(order._id)}
    className="p-2 bg-transparent border-none cursor-pointer"
    >
      <FaTrash className="text-xl align-baseline" />
    </button>}
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90%] overflow-y-auto px-6 relative no-scrollbar" onClick={(e) => e.stopPropagation()}>
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
              <p><strong>Address:</strong> {selectedOrder.shippingInfo.address}</p>
              <p><strong>City:</strong> {selectedOrder.shippingInfo.city}</p>
              <p><strong>State:</strong> {selectedOrder.shippingInfo.state}</p>
              <p><strong>Country:</strong> {selectedOrder.shippingInfo.country}</p>
              <p><strong>Pincode:</strong> {selectedOrder.shippingInfo.pincode}</p>
              <p><strong>Phone No:</strong> {selectedOrder.shippingInfo.phoneNo}</p>
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
              <p><strong>Payment ID:</strong> {selectedOrder.paymentInfo.id}</p>
              <p><strong>Status:</strong> {selectedOrder.paymentInfo.status}</p>
              <p><strong>Paid At:</strong> {new Date(selectedOrder.paidAt).toLocaleString()}</p>
            </div>

            {/* Pricing Details */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Pricing Details</h3>
              <hr className="my-2" />
              <p><strong>Items Price:</strong> ${selectedOrder.itemsPrice}</p>
              <p><strong>Tax Price:</strong> ${selectedOrder.taxPrice}</p>
              <p><strong>Shipping Price:</strong> ${selectedOrder.shippingPrice}</p>
              <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
            </div>

            {/* Order Status */}
            <div>
              <h3 className="text-lg font-semibold">Order Status</h3>
              <hr className="my-2" />
              <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default OrderList;
