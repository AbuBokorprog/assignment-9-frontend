import { Skeleton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ShopCategoriesSkeleton = () => {
  return (
    <div className="">
      <Swiper
        slidesPerView={3}
        spaceBetween={8}
        loop={true}
        breakpoints={{
          480: { slidesPerView: 3, spaceBetween: 8 },
          640: { slidesPerView: 4, spaceBetween: 10 },
          768: { slidesPerView: 5, spaceBetween: 10 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
          1280: { slidesPerView: 7, spaceBetween: 18 },
          1536: { slidesPerView: 9, spaceBetween: 18 },
        }}
        className="mySwiper"
      >
        {[...Array(10)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="cursor-grabbing">
              <Skeleton
                variant="circular"
                width={120}
                height={120}
                className="mx-auto"
              />
              <div className="text-center py-1">
                <Skeleton
                  variant="text"
                  width={100}
                  height={48}
                  className="mx-auto"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopCategoriesSkeleton;
