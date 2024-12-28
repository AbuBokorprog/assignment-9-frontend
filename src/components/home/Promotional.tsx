import React from 'react';

const Promotional: React.FC = () => {
  return (
    <div className="relative hidden lg:block">
      <img
        src="https://img.freepik.com/free-vector/stylish-yellow-red-black-friday-sale-memphis-style-banner_1017-34704.jpg?t=st=1735409211~exp=1735412811~hmac=ed0adeb14ee82e009813fd2591c857561e473642b99ad0f5327aac78c2fcfde6&w=1380"
        alt=""
        className="w-full h-72 object-cover rounded-md"
      />
      <div className="absolute top-1/3 right-10 text-right text-white">
        <h5 className="text-5xl text-center">Special Offer</h5>
        <h3 className="text-7xl uppercase">Up to 50% discount</h3>
      </div>
    </div>
  );
};

export default Promotional;
