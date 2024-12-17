import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useGetAllCouponsQuery } from '../redux/features/api/coupon/coupon.api';
import Loader from '../components/ui/Loader';
import CouponCard from '../components/ui/dashboard/CouponCard';
import { TCoupon } from '../types/coupon.type';
import Title from '../components/helmet/Title';

const AllCoupon: React.FC = () => {
  const { data, isLoading } = useGetAllCouponsQuery({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="container mx-auto">
      <Title title="All Coupon" content="This is all coupon page." />
      {isLoading && <Loader />}
      <div className=" mx-auto">
        <h3 className="text-xl lg:text-3xl font-semibold my-5 lg:my-10 text-center uppercase">
          Exclusive Discounts & Coupons.
        </h3>
        <div className="mb-5 lg:mb-10">
          <Grid container spacing={3}>
            {data?.data?.map((coupon: TCoupon, index: number) => (
              <Grid item xl={3} sm={4} xs={6} key={index}>
                <CouponCard coupon={coupon} />
              </Grid>
            ))}
          </Grid>

          {data?.data?.length === 0 && (
            <div className="text-center py-16">
              <Typography variant="h6" color="textSecondary">
                No Offer / discount found
              </Typography>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllCoupon;
