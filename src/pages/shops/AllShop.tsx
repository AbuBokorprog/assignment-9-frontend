import React, { useEffect } from 'react';
import Shop from '../../components/shop/Shop';
import Title from '../../components/helmet/Title';

const AllShop: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Title title="All Shop" content="This is all shop page." />
      <Shop />
    </div>
  );
};

export default AllShop;
