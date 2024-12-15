import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../ui/ProductCard';
import { Grid } from '@mui/material';
import { useGetAllAvailableProductsInfinityScrollQuery } from '../../redux/features/api/products/products.api';
import Loader from '../ui/Loader';
import useDebounce from '../../custome-hook/useDebounce';

const Products: React.FC = () => {
  const productsContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const debounceQuery = useDebounce(currentPage, 500);

  const { data, isFetching, isLoading } =
    useGetAllAvailableProductsInfinityScrollQuery([
      { name: 'page', value: debounceQuery },
      { name: 'limit', value: 10 },
    ]);

  const products = data?.data?.data;

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom = productsContainerRef.current;

      if (scrolledToBottom && !isFetching) {
        // console.log('Fetching more data...');
        setCurrentPage(debounceQuery + 1);
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [currentPage, isFetching]);

  return (
    <div ref={productsContainerRef}>
      {isLoading && <Loader />}
      <Grid container spacing={2}>
        {products?.map((p: any, index: number) => (
          <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
      {isFetching && <p>Loading...</p>}
    </div>
  );
};

export default Products;
