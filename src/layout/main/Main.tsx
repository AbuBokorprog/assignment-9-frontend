import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer';

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
