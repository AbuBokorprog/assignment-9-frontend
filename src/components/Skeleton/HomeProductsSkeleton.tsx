import ProductsSkeleton from './ProductsSkeleton';
import { Skeleton } from '@mui/material';

const HomeProductsSkeleton = () => {
  return (
    <div>
      <div className="">
        <div className="my-5 lg:my-10">
          <Skeleton width={200} height={60} className="mx-auto" />
        </div>

        <div>
          <ProductsSkeleton />
        </div>
      </div>
    </div>
  );
};

export default HomeProductsSkeleton;
