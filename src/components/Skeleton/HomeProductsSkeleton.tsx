import ProductsSkeleton from './ProductsSkeleton';
import { Skeleton } from '@mui/material';

const HomeProductsSkeleton = () => {
  return (
    <div>
      <div className="">
        <div className="my-10 lg:my-16">
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
