import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllAvailableProductsQuery } from '../../redux/features/api/products/products.api';
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import ProductCard from '../../components/ui/ProductCard';
import Loader from '../../components/ui/Loader';
import Title from '../../components/helmet/Title';

const SearchProducts = () => {
  const { searchTerm } = useParams();
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isFetching } = useGetAllAvailableProductsQuery([
    { name: 'page', value: page },
    { name: 'limit', value: 10 },
    { name: 'searchTerm', value: searchTerm },
  ]);

  const meta = data?.data?.meta;

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div className="px-2">
      <Title
        title={`${searchTerm} products`}
        content={`This is ${searchTerm} products page.`}
      />
      {(isLoading || isFetching) && <Loader />}
      <div className="my-10 lg:my-16">
        <Box>
          <Grid container spacing={2}>
            {data?.data?.data?.map((p: any, index: number) => (
              <Grid item xl={2} lg={3} md={4} sm={4} xs={6} key={index}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

      {data?.data?.data?.length === 0 && (
        <div className="text-center py-16">
          <Typography variant="h6" color="textSecondary">
            No products found
          </Typography>
        </div>
      )}

      <Stack spacing={2} className="mx-auto text-center">
        <Pagination
          count={Math.round(meta?.total / 10) || 1}
          page={page}
          color="primary"
          onChange={handleChange}
          className="mx-auto my-5"
        />
      </Stack>
    </div>
  );
};

export default SearchProducts;
