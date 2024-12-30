import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Skeleton } from '@mui/material';

const TopCategoriesSkeleton = () => {
  return (
    <div className="my-10 lg:my-16 container mx-auto">
      <Skeleton width={200} height={60} className="my-10 lg:my-16 mx-auto" />

      <div>
        <>
          <Swiper
            slidesPerView={2}
            spaceBetween={8}
            pagination={{
              clickable: true,
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              // Larger mobile devices (landscape)
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              // Tablets (portrait)
              768: {
                slidesPerView: 3.5,
                spaceBetween: 10,
              },
              // Tablets (landscape) and small desktops
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
              // Medium desktops
              1280: {
                slidesPerView: 5,
                spaceBetween: 18,
              },
              // Large desktops
              1536: {
                slidesPerView: 7,
                spaceBetween: 18,
              },
            }}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((c) => (
              <SwiperSlide key={c}>
                <div className="mx-auto">
                  <div className="bg-secondary-200 mx-auto size-52 rounded-md animate-pulse"></div>
                  <Skeleton width={200} className="mx-auto" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default TopCategoriesSkeleton;
