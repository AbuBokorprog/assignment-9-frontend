import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PaymentIcon from '@mui/icons-material/Payment';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Card } from '@mui/material';

// Banner images data
const bannerImages = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
    title: 'Special Offer',
    subtitle: 'Up to 50% Off',
    link: '/special-offers',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop',
    title: 'New Arrivals',
    subtitle: 'Check out our latest collection',
    link: '/new-arrivals',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070&auto=format&fit=crop',
    title: 'Premium Quality',
    subtitle: 'Discover luxury items',
    link: '/premium',
  },
];

// Trust features data
const trustFeatures = [
  {
    icon: <LocalShippingIcon className="text-4xl text-primary-500" />,
    title: 'Free Shipping',
    description: 'On orders over ৳2000',
  },
  {
    icon: <SupportAgentIcon className="text-4xl text-primary-500" />,
    title: '24/7 Support',
    description: 'Get help anytime',
  },
  {
    icon: <PaymentIcon className="text-4xl text-primary-500" />,
    title: 'Secure Payment',
    description: '100% secure payment',
  },
  {
    icon: <VerifiedUserIcon className="text-4xl text-primary-500" />,
    title: 'Money Back',
    description: '30 days guarantee',
  },
];

const Banner = () => {
  return (
    <div className="container mx-auto py-6">
      {/* Main Banner Slider */}
      <div className="mb-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="rounded-lg overflow-hidden h-[400px] md:h-[500px]"
        >
          {bannerImages.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-xl md:text-2xl mb-6">{banner.subtitle}</p>
                  <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full transition duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Trust Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {trustFeatures.map((feature, index) => (
          <Card
            key={index}
            className="flex flex-col items-center text-center p-4 transition-transform hover:transform hover:scale-105"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Banner;
