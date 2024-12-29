import { Card, CardActionArea, CardContent, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

const AllCategoriesSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center justify-center gap-4 mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
        <div key={index}>
          <Card sx={{ maxWidth: 1000 }} className="my-2 animate-pulse">
            <Link to={'/products-collection/electronics'}>
              <CardActionArea>
                <div className="bg-secondary-200 w-full h-44"></div>
                <CardContent>
                  <Skeleton />
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default AllCategoriesSkeleton;
