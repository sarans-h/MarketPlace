import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import MetaData from '../../layout/MetaData';

const OrderSuccess = () => {
    const [animationPlayed, setAnimationPlayed] = useState(false);

    // Get window dimensions to ensure the confetti covers the entire screen
    const { width, height } = useWindowSize();

    useEffect(() => {
        setAnimationPlayed(true);
    }, []);

    return (
        <>
        <MetaData title={"Order Successfull"}/>
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
            {animationPlayed && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={1000}  // Adjust the number of confetti pieces as needed
                    recycle={false}  // Confetti stops after one 
                    colors={["black"]}
                    
                    
                />
            )}

            <div className={`relative z-20 text-center ${animationPlayed ? 'animate-checked' : ''}`}>
                <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                        <svg
                            className={`w-10 h-10 text-white ${animationPlayed ? 'animate-draw-check' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-black mb-4">Order Placed Successfully!</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>
                <div className="bg-black text-white px-6 py-3 rounded-md cursor-pointer hover:bg-gray-900">
                    <a href="/" className="no-underline">Continue Shopping</a>
                </div>
            </div>
        </div>
        </>
    );
};

export default OrderSuccess;
