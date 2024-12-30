import { Box, Card, CardContent, Divider, Skeleton } from '@mui/material';
import React from 'react';
import ProductsSkeleton from './ProductsSkeleton';

const ShopDetailsSkeleton: React.FC = () => {
  return (
    <Box className="container mx-auto px-2">
      <Card className="hover:shadow-lg transition-shadow">
        <div className="h-72 bg-cover bg-center bg-secondary-200 animate-pulse relative">
          <div className="absolute -bottom-6 left-6 border-4 size-24 rounded-full bg-secondary-200 animate-pulse border-white shadow-md"></div>
          <Skeleton width={50} className="absolute top-4 right-4 bg-white" />
        </div>
        <CardContent className="pt-8">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton width={250} />
              <Skeleton width={250} />

              <div className="flex items-center gap-2 mb-3">
                <Skeleton width={50} />
                <Skeleton width={50} />
              </div>
              <Skeleton width={250} />
            </div>
            <div className="flex gap-2 items-center ">
              <Skeleton width={20} />
              <Skeleton width={80} height={40} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-4 mt-4">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Skeleton width={250} />
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Skeleton width={250} />
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Skeleton width={250} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Divider />
      {/* Products */}
      <Box>
        <Skeleton width={250} className="text-center my-10 lg:my-16" />

        <ProductsSkeleton />
      </Box>
    </Box>
  );
};

export default ShopDetailsSkeleton;
