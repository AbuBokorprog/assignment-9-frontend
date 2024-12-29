import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';

type TFilteringModalProps = {
  open: boolean;
  setOpen: any;
  category: string | null;
  setCategory: any;
  type: string | null;
  setType: any;
  maxPrice: string;
  setMaxPrice: any;
  minPrice: string;
  setMinPrice: any;
  stock: string | null;
  setStock: any;
  sortBy: string;
  setSortBy: any;
  categories: any;
};

const FilteringModal: React.FC<TFilteringModalProps> = ({
  open,
  setOpen,
  category,
  setCategory,
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
  setStock,
  setType,
  stock,
  type,
  setSortBy,
  sortBy,
  categories,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Product filter
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Card className="lg:hidden block">
            <CardContent>
              <Grid container spacing={3} direction="column">
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="">All</MenuItem>
                      {categories?.map((cat: any, index: number) => (
                        <MenuItem key={index} value={cat?.value?.toLowerCase()}>
                          {cat?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Product Type</InputLabel>
                    <Select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      label="Product Type"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="REGULAR">Regular</MenuItem>
                      <MenuItem value="FLASH_SALE">Flash Sale</MenuItem>
                      <MenuItem value="HOT">Hot</MenuItem>
                      <MenuItem value="NEW">New</MenuItem>
                      <MenuItem value="FEATURED">Featured</MenuItem>
                      <MenuItem value="DISCOUNT">Discount</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Stock Type</InputLabel>
                    <Select
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      label="Stock Type"
                    >
                      <MenuItem value="IN_STOCK">In Stock</MenuItem>
                      <MenuItem value="LOW_STOCK">Low Stock</MenuItem>
                      <MenuItem value="OUT_OF_STOCK">Out Of Stock</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <FormControl fullWidth>
                      <InputLabel>Min Price</InputLabel>
                      <Select
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        label="Min price"
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="100">100</MenuItem>
                        <MenuItem value="200">200</MenuItem>
                        <MenuItem value="500">500</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Max Price</InputLabel>
                      <Select
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        label="Max Price"
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="1000">1000</MenuItem>
                        <MenuItem value="2000">2000</MenuItem>
                        <MenuItem value="500">500</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="Sort By"
                    >
                      <MenuItem value="createdAt">Default</MenuItem>
                      <MenuItem value="inventory">Stock By</MenuItem>
                      <MenuItem value="reviews">Rate By</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default FilteringModal;
