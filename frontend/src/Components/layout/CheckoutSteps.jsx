import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    { id: 1, name: 'Shipping' },
    { id: 2, name: 'Confirm Order' },
    { id: 3, name: 'Payment' },
  ];

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex-1 text-center py-2 ${
            activeStep >= step.id
              ? 'text-black font-bold'
              : 'text-gray-400 font-bold'
          }`}
        >
          {activeStep>=step.id ? (
            <FaCheckCircle className="inline-block mr-2 text-green-500" />
          ) : (
            <span className="inline-block mr-2">{step.id}</span>
          )}
          <span>{step.name}</span>
          
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
