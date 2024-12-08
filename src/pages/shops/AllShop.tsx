import React, { useEffect } from 'react';
import Shop from '../../components/shop/Shop';

const AllShop: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Shop />
    </div>
  );
};

export default AllShop;
