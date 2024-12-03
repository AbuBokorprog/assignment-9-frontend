import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Rating,
  Chip,
  Avatar,
} from '@mui/material';
import {
  FaSearch,
  FaStore,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaHeart,
} from 'react-icons/fa';

interface Shop {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  rating: number;
  totalProducts: number;
  totalReviews: number;
  address: string;
  phone: string;
  website?: string;
  status: 'open' | 'closed';
  category: string;
  followedSince: string;
}

const CustomerFollowShop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data - replace with actual API call
  const followedShops: Shop[] = [
    {
      id: '1',
      name: 'Electronics Hub',
      logo: 'https://placehold.co/100x100',
      coverImage: 'https://placehold.co/600x200',
      rating: 4.5,
      totalProducts: 150,
      totalReviews: 89,
      address: '123 Tech Street, Digital City',
      phone: '+1 234-567-8900',
      website: 'www.electronichub.com',
      status: 'open',
      category: 'Electronics',
      followedSince: '2024-01-15',
    },
    {
      id: '2',
      name: 'Fashion Trends',
      logo: 'https://placehold.co/100x100',
      coverImage: 'https://placehold.co/600x200',
      rating: 4.8,
      totalProducts: 300,
      totalReviews: 156,
      address: '456 Style Avenue, Fashion District',
      phone: '+1 234-567-8901',
      website: 'www.fashiontrends.com',
      status: 'open',
      category: 'Fashion',
      followedSince: '2024-02-20',
    },
    {
      id: '3',
      name: 'Home Decor Plus',
      logo: 'https://placehold.co/100x100',
      coverImage: 'https://placehold.co/600x200',
      rating: 4.2,
      totalProducts: 200,
      totalReviews: 67,
      address: '789 Home Street, Decor City',
      phone: '+1 234-567-8902',
      status: 'closed',
      category: 'Home & Living',
      followedSince: '2024-03-01',
    },
  ];

  const filteredShops = followedShops.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUnfollow = (shopId: string) => {
    // Implement unfollow logic
    console.log('Unfollowing shop:', shopId);
  };

  const handleVisitShop = (shopId: string) => {
    // Implement shop visit logic
    console.log('Visiting shop:', shopId);
  };

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">Followed Shops</h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
          <TextField
            size="small"
            placeholder="Search shops..."
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
          {filteredShops.map((shop) => (
            <Grid item xs={12} key={shop.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${shop.coverImage})` }}
                >
                  <div className="absolute -bottom-6 left-6">
                    <Avatar
                      src={shop.logo}
                      alt={shop.name}
                      sx={{ width: 84, height: 84 }}
                      className="border-4 border-white shadow-md"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Chip
                      label={shop.status}
                      color={shop.status === 'open' ? 'success' : 'error'}
                      size="small"
                    />
                  </div>
                </div>
                <CardContent className="pt-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <Typography variant="h5" component="h3" className="mb-1">
                        {shop.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-2"
                      >
                        {shop.category}
                      </Typography>
                      <div className="flex items-center gap-2 mb-3">
                        <Rating value={shop.rating} readOnly size="small" />
                        <Typography variant="body2" color="textSecondary">
                          ({shop.totalReviews} reviews)
                        </Typography>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<FaHeart />}
                        onClick={() => handleUnfollow(shop.id)}
                      >
                        Unfollow
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleVisitShop(shop.id)}
                      >
                        Visit Shop
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt />
                      <Typography variant="body2">{shop.address}</Typography>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhoneAlt />
                      <Typography variant="body2">{shop.phone}</Typography>
                    </div>
                    {shop.website && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaGlobe />
                        <Typography variant="body2">{shop.website}</Typography>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaStore />
                      <Typography variant="body2">
                        {shop.totalProducts} Products
                      </Typography>
                    </div>
                  </div>

                  <Typography
                    variant="caption"
                    color="textSecondary"
                    className="block mt-4"
                  >
                    Following since{' '}
                    {new Date(shop.followedSince).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredShops.length === 0 && (
          <div className="text-center py-16">
            <FaStore className="text-6xl text-gray-300 mx-auto mb-4" />
            <Typography variant="h6" color="textSecondary">
              No shops found
            </Typography>
            <Typography color="textSecondary">
              {searchTerm
                ? 'Try adjusting your search terms'
                : "You haven't followed any shops yet"}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerFollowShop;
