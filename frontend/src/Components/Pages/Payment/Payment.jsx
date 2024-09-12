import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../../layout/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../layout/MetaData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { clearErrors,createOrder } from "../../../features/orderSlice";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const {error}=useSelector((state)=>state.order)
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100)
  }
  useEffect(() => {
    if (error) {
      
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const navigate = useNavigate();
  const order={
    shippingInfo:{
      address: shippingInfo.address,
      city: shippingInfo.city.value,
      state: shippingInfo.state.value,
      pincode: shippingInfo.zipCode,
      country: shippingInfo.country.value,
      phoneNo:shippingInfo.phoneNo
    },
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    totalPrice: orderInfo.totalPrice,
    shippingPrice:orderInfo.shippingCost
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      };
      const { data } = await axios.post("/api/v1/payment/process", paymentData, config);
      const client_secret = data.client_secret
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city.value,
              state: shippingInfo.state.value,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country.value,
            }
          }
        }

      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);

      }
      else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo={
            id:result.paymentIntent.id,
            status:result.paymentIntent.status
          }
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.error("Something went wrong");
        }
      }

    } catch (error) {
      payBtn.current.disabled = false;
      toast.error("Payment Failed");
    }


  };



  return (
    <div>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={3} />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border-1 border-black m-14">
        <form className="space-y-6" onSubmit={submitHandler}>
          <h2 className="text-2xl font-semibold text-center mb-6">Card Info</h2>
          <div className="flex items-center space-x-4">
            <CardNumberElement className="paymentInput w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex items-center space-x-4">
            <CardExpiryElement className="paymentInput w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex items-center space-x-4">
            <CardCvcElement className="paymentInput w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <button
            type="submit"
            ref={payBtn}
            className="w-full py-3 bg-black text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-800 transition-colors"
          >
            Pay - ₹{orderInfo && orderInfo.totalPrice}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Payment;