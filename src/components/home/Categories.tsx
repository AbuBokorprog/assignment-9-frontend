import React from 'react';
import { useGetAllCategoriesQuery } from '../../redux/features/api/categories/catgeories.api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
// import './categories.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { TCategory } from '../../types/categories.type';
import TopCategoriesSkeleton from '../Skeleton/TopCategoriesSkeleton';

const Categories: React.FC = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});
  return (
    <>
      {isLoading ? (
        <TopCategoriesSkeleton />
      ) : (
        data?.data?.length > 0 && (
          <div className="my-5 lg:my-10 container mx-auto px-2">
            <h3 className="my-5 lg:my-10 text-center uppercase text-xl lg:text-3xl font-semibold">
              Top Categories
            </h3>

            <div>
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
                  // Small mobile devices (portrait)
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
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  // Tablets (landscape) and small desktops
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  // Medium desktops
                  1280: {
                    slidesPerView: 4.5,
                    spaceBetween: 18,
                  },
                  // Large desktops
                  1536: {
                    slidesPerView: 5.5,
                    spaceBetween: 18,
                  },
                }}
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
              >
                {data?.data?.map((c: TCategory, index: number) => (
                  <SwiperSlide key={index}>
                    <div>
                      <Link to={`/all-products/?category=${c?.name}`}>
                        <img
                          src={c?.image}
                          alt={c?.name}
                          className="h-40 w-full mx-auto rounded-md"
                        />
                        <div className="text-center py-1">
                          <h3 className="text-lg font-medium h-12">
                            {c?.name}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Categories;
