import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer';
import { animateScroll as scroll } from 'react-scroll';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { Button } from '@mui/material';
import Newsletter from '../../components/home/Newsletter';

const Main: React.FC = () => {
  return (
    <div className="relative">
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
      <div className="fixed bottom-0 right-0">
        <Button color="secondary" onClick={() => scroll.scrollTo(1)}>
          <FaArrowAltCircleUp className="w-10 h-10 text-black" />
        </Button>
      </div>
    </div>
  );
};

export default Main;
