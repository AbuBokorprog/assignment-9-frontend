import React from 'react';

const Promotional: React.FC = () => {
  return (
    <div className=" bg-gradient-to-r from-black to-pink-500 text-white py-8 px-5 lg:px-10">
      <div className="container mx-auto lg:flex items-center justify-between">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            🎉 New Year Special Discount 🎉
          </h1>
          <p className="text-lg mb-6">
            Start your year with amazing savings! Get
            <span className="font-bold text-yellow-300"> 20% OFF </span>
            on all products.
          </p>
        </div>
        <div className="flex justify-center space-x-4 items-center">
          <p className="text-xl font-semibold">Use Coupon</p>
          <button className="bg-black text-white font-semibold px-6 py-3 rounded-full ">
            NEWYEAR2025
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promotional;
