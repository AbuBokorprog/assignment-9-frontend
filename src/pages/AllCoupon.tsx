import React from 'react';
import { Grid } from '@mui/material';
import { useGetAllCouponsQuery } from '../redux/features/api/coupon/coupon.api';
import Loader from '../components/ui/Loader';
import CouponCard from '../components/ui/dashboard/CouponCard';
import { TCoupon } from '../types/coupon.type';

const AllCoupon: React.FC = () => {
  const { data, isLoading } = useGetAllCouponsQuery({});

  return (
    <section className="">
      {isLoading && <Loader />}
      <div className=" mx-auto">
        <h3 className="text-xl lg:text-3xl font-semibold my-10 lg:my-16 text-center uppercase">
          Exclusive Discounts & Coupons.
        </h3>
        <Grid container spacing={3}>
          {data?.data?.map((coupon: TCoupon, index: number) => (
            <Grid item xl={3} sm={4} xs={6} key={index}>
              <CouponCard coupon={coupon} />
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default AllCoupon;
