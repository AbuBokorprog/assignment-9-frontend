import React, { useState } from 'react';
import {
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { useGetAllMyComparesQuery } from '../../../redux/features/api/compare/compare.api';
import { LuGitCompare } from 'react-icons/lu';
import Loader from '../../../components/ui/Loader';
import ClearIcon from '@mui/icons-material/Clear';
import { TComparison } from '../../../types/comparison.type';
import { useDeleteCategoryMutation } from '../../../redux/features/api/categories/catgeories.api';
import { toast } from 'sonner';

const CustomerComparison: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useGetAllMyComparesQuery({});
  const [deleteComparison] = useDeleteCategoryMutation();
  const filteredItems = data?.data.filter((item: any) =>
    item.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const comparisonAtt = ['Image', 'Name', 'Category', 'Price', 'Rating'];

  const deleteHandler = async (id: string) => {
    const toastId = toast.loading('Loading...');
    try {
      const res = await deleteComparison(id).unwrap();
      toast.success(res?.message, { id: toastId, duration: 200 });
    } catch (error: any) {
      toast.error(error?.error);
    }
  };

  return (
    <div className="container mx-auto px-2">
      {isLoading && <Loader />}
      <div className="flex justify-between items-center my-5">
        <div className="flex items-center gap-2">
          <Typography
            variant="h4"
            component={'h4'}
            className="text-3xl font-bold"
          >
            My Comparison Products ({data?.data?.length})
          </Typography>
          <LuGitCompare className="text-2xl text-primary-500" />
        </div>
        <TextField
          size="small"
          placeholder="Search comparison..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          className="w-64"
        />
      </div>
      <TableContainer component={Paper}>
        <Table className="min-w-full" aria-label="simple-table">
          <TableHead>
            <TableRow>
              <TableCell
                component={'th'}
                className="font-bold flex justify-between"
              >
                Product Details
              </TableCell>
              {filteredItems?.map((item: TComparison, index: number) => (
                <TableCell key={index} className="relative" component={'th'}>
                  {item?.product?.name}
                  <IconButton
                    size="small"
                    className="absolute top-0 right-0"
                    aria-label="close"
                    onClick={() => deleteHandler(item?.id)}
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Loop through attributes */}
            {comparisonAtt.map((att, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Attribute Name */}
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontWeight: 'bold' }}
                >
                  {att}
                </TableCell>
                {/* Product Values */}
                {filteredItems.map((item: TComparison, colIndex: number) => (
                  <TableCell key={colIndex}>
                    {(() => {
                      switch (att) {
                        case 'Image':
                          return item?.product?.images?.[0];
                        case 'Name':
                          return item?.product?.name;
                        case 'Category':
                          return item?.product?.category?.name;
                        case 'Price':
                          return `${
                            item?.product?.discount_price
                              ? item?.product?.discount_price?.toFixed(2)
                              : item?.product?.regular_price?.toFixed(2)
                          }`;
                        case 'Rating':
                          return item?.rating;
                        default:
                          return '';
                      }
                    })()}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* {filteredItems?.length === 0 && (
        <div className="text-center py-16">
          <LuGitCompare className="text-6xl text-gray-300 mx-auto mb-4" />
          <Typography variant="h6" color="textSecondary">
            No items found in your comparison
          </Typography>
          <Typography color="textSecondary">
            {searchTerm
              ? 'Try adjusting your search terms'
              : 'Start adding items to your comparison!'}
          </Typography>
        </div>
      )} */}
    </div>
  );
};

export default CustomerComparison;
