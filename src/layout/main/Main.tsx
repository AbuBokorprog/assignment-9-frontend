import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer';
import { animateScroll as scroll } from 'react-scroll';

const Main: React.FC = () => {
  return (
    <div className="relative">
      <Header />
      <Outlet />
      <Footer />
      <div className="fixed bottom-0 right-0">
        <li>
          <a onClick={() => scroll.scrollTo(100)}>Scroll To 100!</a>
        </li>
      </div>
    </div>
  );
};

export default Main;
