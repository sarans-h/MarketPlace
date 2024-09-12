import React from 'react';
import MetaData from '../../layout/MetaData';
import CheckoutSteps from '../../layout/CheckoutSteps';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ConfirmOrder() {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    
    // Calculate total price
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping for orders above $500
    const tax = subtotal * 0.18; // Assuming 18% tax
    const totalPrice = subtotal + shippingCost + tax;
    const navigate=useNavigate();
    const proceedToPayment=()=>{
        const data={
            subtotal,
            shippingCost,
            tax,
            totalPrice
            
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        navigate("/process/payment");
    }
    return (
        <>
            <MetaData title={"Confirm Order"} />
            <CheckoutSteps activeStep={2} />
            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-center text-3xl font-semibold mb-8">Confirm Order</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col">
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-black h-56 overflow-y-auto mb-4">
                            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                            <p className="text-gray-700"><strong>Name:</strong> {shippingInfo.fullName}</p>
                            <p className="text-gray-700"><strong>Phone:</strong> {shippingInfo.phoneNo}</p>
                            <p className="text-gray-700"><strong>Address:</strong> {`${shippingInfo.address}, ${shippingInfo.city.value}, ${shippingInfo.state.value}, ${shippingInfo.zipCode}, ${shippingInfo.country.label}`}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg border border-black mt-auto">
                            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                            <p className="text-gray-700"><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                            <p className="text-gray-700"><strong>Shipping:</strong> ${shippingCost.toFixed(2)}</p>
                            <p className="text-gray-700"><strong>Tax:</strong> ${tax.toFixed(2)}</p>
                            <p className="text-gray-700 font-bold text-lg mt-2"><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg border border-black col-span-2 h-93 overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4">Your Cart Items</h3>
                        {cartItems.map((item) => (
                            <div key={item.product} className="flex items-center justify-between mb-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                <p className="flex-grow text-gray-700">{item.name}</p>
                                <p className="text-gray-700">{`${item.quantity} x $${item.price} = $${(item.quantity * item.price).toFixed(2)}`}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="mt-8 w-full py-3 bg-black text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-800 transition-colors" onClick={proceedToPayment}>
                    Proceed To Payment
                </button>
            </div>
        </>
    );
}

export default ConfirmOrder;
