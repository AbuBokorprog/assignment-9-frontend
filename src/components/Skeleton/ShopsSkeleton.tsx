import { Box, Card, CardContent, Skeleton } from '@mui/material';
import React from 'react';

const ShopsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8]?.map((s) => (
        <Card
          key={s}
          className="h-full hover:shadow-lg transition-shadow duration-300"
        >
          <Box className="relative">
            <div className="bg-secondary-200 animate-pulse w-full h-32 lg:h-44"></div>

            <Skeleton width={70} className="absolute top-2 left-2 bg-white" />
          </Box>
          <CardContent>
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-secondary-200 animate-pulse size-20 rounded-full"></div>
              <div className="space-y-2">
                <Skeleton width={300} />
                <Skeleton width={300} />
              </div>
            </div>

            <div className=" mb-2">
              <Skeleton width={200} />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <Skeleton width={250} />
            </div>

            <div className="flex justify-between items-center mt-3">
              <Skeleton width={200} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ShopsSkeleton;
