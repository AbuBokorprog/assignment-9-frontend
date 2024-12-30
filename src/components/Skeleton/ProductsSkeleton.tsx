import { Card, Skeleton } from '@mui/material';

const ProductsSkeleton = () => {
  return (
    <div className="grid my-10 lg:my-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 items-center gap-4 mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((p) => (
        <Card key={p} className="rounded-md shadow-md p-2 ">
          <div className="bg-secondary-200 animate-pulse w-full h-32 lg:h-44"></div>
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <div className="my-1">
            <Skeleton height={60} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
