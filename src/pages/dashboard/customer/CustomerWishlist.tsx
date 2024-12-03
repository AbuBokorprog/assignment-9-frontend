import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { FaSearch, FaShoppingCart, FaTrash, FaRegHeart } from 'react-icons/fa';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  vendor: string;
  rating: number;
}

const CustomerWishlist: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data - replace with actual API call
  const wishlistItems: WishlistItem[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://placehold.co/300x300',
      stock: 10,
      vendor: 'Electronics Store',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://placehold.co/300x300',
      stock: 5,
      vendor: 'Tech World',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      price: 79.99,
      image: 'https://placehold.co/300x300',
      stock: 0,
      vendor: 'Audio Shop',
      rating: 4.2,
    },
  ];

  const filteredItems = wishlistItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveFromWishlist = (itemId: string) => {
    // Implement remove from wishlist logic
    console.log('Removing item:', itemId);
  };

  const handleAddToCart = (itemId: string) => {
    // Implement add to cart logic
    console.log('Adding to cart:', itemId);
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">My Wishlist</h2>
            <FaRegHeart className="text-2xl text-primary-500" />
          </div>
          <TextField
            size="small"
            placeholder="Search wishlist..."
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

        <Grid container spacing={4}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card className="h-full flex flex-col">
                <div className="relative">
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                    className="h-48 object-cover"
                  />
                  <IconButton
                    className="absolute top-2 right-2 bg-white hover:bg-red-50"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    size="small"
                  >
                    <FaTrash className="text-red-500" />
                  </IconButton>
                </div>
                <CardContent className="flex-1 flex flex-col">
                  <Typography variant="h6" component="h3" className="mb-2">
                    {item.name}
                  </Typography>
                  <div className="text-sm text-gray-600 mb-2">
                    Vendor: {item.vendor}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-semibold text-primary-500">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="text-sm text-gray-500">
                      Rating: {item.rating}/5
                    </div>
                  </div>
                  <div className="mt-auto">
                    {item.stock > 0 ? (
                      <div className="space-y-2">
                        <div className="text-sm text-green-600">
                          In Stock ({item.stock} available)
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<FaShoppingCart />}
                          onClick={() => handleAddToCart(item.id)}
                          fullWidth
                        >
                          Add to Cart
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-red-600">Out of Stock</div>
                        <Button variant="contained" disabled fullWidth>
                          Out of Stock
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <FaRegHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <Typography variant="h6" color="textSecondary">
              No items found in your wishlist
            </Typography>
            <Typography color="textSecondary">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Start adding items to your wishlist!'}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerWishlist;
