import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const data = {
    generalData: {
      logo_url: '/images/logo.png',
      facebook: 'https://www.facebook.com/masemart',
      twitter: 'https://www.twitter.com/masemart',
      instagram: 'https://www.instagram.com/masemart',
      youtube: 'https://www.youtube.com/masemart',
      address: '123 Main St, Anytown, USA',
      phone: '+1 (123) 456-7890',
      email: 'info@masemart.com',
    },
  };

  return (
    // <!-- footer Section -->
    <footer className="text-black">
      <div className="mx-auto w-full max-w-screen-2xl bg-white px-2 ">
        <div className="grid grid-cols-1 gap-12 py-6 lg:py-8 md:grid-cols-4 items-start">
          <div>
            <Link to="/">
              <img
                src={data?.generalData?.logo_url}
                alt="Logo"
                className=" w-1/2 lg:w-full"
              />
            </Link>
            <div>
              <h2 className="mt-4 text-lg md:text-xl font-semibold text-primary uppercase">
                Follow Us
              </h2>
              <div>
                <ul className="flex gap-4 mt-1 items-center">
                  <li className="">
                    <a
                      href={data?.generalData?.facebook}
                      aria-label="Facebook"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebook className="w-8 h-8" />
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      href={data?.generalData?.twitter}
                      aria-label="Twitter"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaTwitter className="w-8 h-8" />
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      href={data?.generalData?.instagram}
                      aria-label="Instagram"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram className="w-8 h-8" />
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      href={data?.generalData?.youtube}
                      aria-label="Youtube"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaYoutube className="w-8 h-8" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="h-60">
            <h2 className="mt-4 md:mt-0 text-lg md:text-xl font-semibold text-primary uppercase">
              CONTACTS
            </h2>
            <h2 className="mt-2 text-sm font-semibold text-primary">Address</h2>
            <p>{data?.generalData?.address}</p>
            <h2 className="mt-2 text-sm font-semibold text-primary">Phone</h2>
            <p>{data?.generalData?.phone}</p>
            <h2 className="mt-2 text-sm font-semibold text-primary">Email</h2>
            <p>{data?.generalData?.email}</p>
          </div>

          <div className="">
            <h2 className="mt-4 md:mt-0 text-lg md:text-xl font-semibold text-primary uppercase">
              Company
            </h2>
            <ul className="text-black">
              <li className="mt-4">
                <Link to="/about-us" className="hover:underline">
                  About us
                </Link>
              </li>
              <li className="my-2">
                <Link to="/contact-us" className="hover:underline">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div className="h-60">
            <h2 className="mt-4 md:mt-0 text-lg md:text-xl font-semibold text-primary uppercase">
              Legals
            </h2>
            <ul className="text-black">
              <li className="my-2">
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li className="my-2">
                <Link to="/terms-condition" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li className="my-2">
                <Link to="/refund" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
              <li className="my-2">
                <Link to="/payment" className="hover:underline">
                  Payment Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-black border" />
        <div className="py-6 text-center md:flex justify-between items-center">
          <div>
            <p>
              © 2024 <Link to="/">BazaarBridge™</Link>. All Rights Reserved.
            </p>
          </div>
          <div className="md:flex items-center gap-3 mb-16 md:mb-0">
            <p>Payment Methods</p>
            <div className="flex flex-wrap items-center gap-2">
              <img src="/images/bkash.png" alt="" className="w-20 bg-white" />
              <img src="/images/nagad.png" alt="" className="w-20 bg-white" />
              <img
                src="/images/visa-card.png"
                alt=""
                className="w-20 bg-white"
              />
              <img
                src="/images/master-card.webp"
                alt=""
                className="w-16 bg-white"
              />
              <img src="/images/ssl-thumb.jpg" alt="" className="w-20" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
