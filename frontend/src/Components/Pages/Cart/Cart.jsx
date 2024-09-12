import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../../features/cartSlice';
import { useNavigate  } from 'react-router-dom';
import MetaData from '../../layout/MetaData';

const Cart = () => {
  // Fetching cartItems from the Redux store
  const { cartItems } = useSelector((state) => state.cart);


  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user); // Assuming user authentication is stored in user state
  
const navigate=useNavigate();
  const checkoutHandler=()=>{
    if (isAuthenticated) {
        navigate("/shipping");
      } else {
        navigate("/loginsignup?redirect=shipping");
      }
  }

  // Handle increment of quantity
  const onAdd = (item) => {
    // console.log(item);
    
    const newQty=item.quantity+1;
    if(item.stock<=item.quantity)return;

    dispatch(addItemsToCart(item.product, newQty));
  };

  // Handle decrement of quantity
  const onRemove = (item) => {
    const newQty=item.quantity-1;
    if(newQty==0)dispatch(removeItemsFromCart(item.product));
    if (1>=item.quantity ) {
        return;
    } 
      dispatch(addItemsToCart(item.product, newQty));
    
  };

  // Calculate prices
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 50;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <>
    <MetaData title={"Cart"}/>
    <div className="container mx-auto p-4 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg border-1 border-black">
        {cartItems.length === 0 ? (
          <div className="text-4xl text-center font-bold text-gray-500">
            Cart is empty
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="flex justify-between items-center border-b pb-4 mb-4"
              >
                <div>
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                </div>
                <div className="text-lg">{item.name}</div>
                <div className="flex items-center">
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded mr-2"
                    onClick={() => onRemove(item)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-gray-300 text-black px-2 py-1 rounded ml-2"
                    onClick={() => onAdd(item)}
                  >
                    +
                  </button>
                </div>
                <div className="text-lg">${item.price * item.quantity}</div>
              </div>
            ))}
            <div className="flex justify-between items-center mb-4">
              <div>Items Price:</div>
              <div>${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>Tax Price:</div>
              <div>${taxPrice.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>Shipping Price:</div>
              <div>${shippingPrice.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center font-bold text-xl">
              <div>Total Price:</div>
              <div>${totalPrice.toFixed(2)}</div>
            </div>
            <button className="w-full bg-black text-white py-2 rounded mt-4" onClick={checkoutHandler}>
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Cart;
