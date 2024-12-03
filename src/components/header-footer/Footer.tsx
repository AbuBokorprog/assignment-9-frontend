// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <section className=" w-full">
      <footer className="footer bg-white text-lg grid grid-cols-1 lg:grid-cols-4 items-start py-5">
        <div>
          <Link to={'/'}>
            <img src=" /images/logo.webp" alt="" className="me-auto" />
          </Link>
          <nav className="mx-auto">
            <ul>
              <p className="text-secondary-500 text-sm">
                House 3, Road 9/B <br />
                Nikunja 1, Khilkhet <br />
                Dhaka 1229, Bangladesh <br />
                Contact : support@sindabad.com <br />
                Trade Licence No.: TRAD/DNCC/028947/2022 <br />
              </p>
            </ul>
          </nav>
        </div>
        <nav>
          <h6 className="text-xl text-secondary-600">Company</h6>
          <ul>
            <li>
              <Link className="hover:underline text-secondary-500" to="/about">
                About us
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-secondary-500"
                to="/contact"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <h6 className="text-xl text-secondary-600">Policy</h6>
          <ul>
            <li>
              <Link
                className="hover:underline text-secondary-500"
                to="/privacy"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="hover:underline text-secondary-500" to="/refund">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-secondary-500"
                to="/payment"
              >
                Payment
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline text-secondary-500"
                to="/terms-condition"
              >
                Terms & Condition
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <h6 className="text-xl text-secondary-600 mb-2">Payment Method</h6>
          <div className="flex flex-wrap items-center gap-2">
            <img src=" /images/nagad.png" alt="" className="w-20 bg-white" />
            <img
              src=" /images/visa-card.png"
              alt=""
              className="w-20 bg-white"
            />
            <img
              src=" /images/master-card.webp"
              alt=""
              className="w-16 bg-white"
            />
            <img src=" /images/ssl-thumb.jpg" alt="" className="w-20" />
          </div>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 bg-base-300 text-lg rounded-md">
        <div>
          <p className="text-center">
            Copyright © 2024 - All right reserved by Sindabad
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
