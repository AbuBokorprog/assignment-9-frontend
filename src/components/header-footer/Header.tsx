import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart,
  Person,
  Store,
  KeyboardArrowDown,
  Dashboard,
  Logout,
  Settings,
  Favorite,
} from '@mui/icons-material';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState<null | HTMLElement>(null);
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Living',
    'Beauty',
    'Books',
    'Sports',
  ];

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/shop' },
    { title: 'New Arrivals', path: '/new-arrivals' },
    { title: 'Best Sellers', path: '/best-sellers' },
    { title: 'Deals', path: '/deals' },
  ];

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryMenu(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryMenu(null);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <AppBar position="sticky" className="bg-white shadow-md">
      {/* Top Bar */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              EShop
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 mx-8">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
              </div>
              <InputBase
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <ShoppingCart className="text-gray-700" />
              </Badge>
            </IconButton>

            <IconButton color="inherit" onClick={handleUserMenuClick}>
              <Person className="text-gray-700" />
            </IconButton>

            {/* User Dropdown Menu */}
            <Menu
              anchorEl={userMenu}
              open={Boolean(userMenu)}
              onClose={handleUserMenuClose}
              className="mt-2"
            >
              <MenuItem onClick={handleUserMenuClose}>
                <Dashboard className="mr-2" /> Dashboard
              </MenuItem>
              <MenuItem onClick={handleUserMenuClose}>
                <Favorite className="mr-2" /> Wishlist
              </MenuItem>
              <MenuItem onClick={handleUserMenuClose}>
                <Settings className="mr-2" /> Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleUserMenuClose}>
                <Logout className="mr-2" /> Logout
              </MenuItem>
            </Menu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon className="text-gray-700" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12">
            {/* Categories Dropdown */}
            <Button
              onClick={handleCategoryClick}
              className="text-gray-700 hover:bg-gray-200"
              endIcon={<KeyboardArrowDown />}
            >
              Categories
            </Button>
            <Menu
              anchorEl={categoryMenu}
              open={Boolean(categoryMenu)}
              onClose={handleCategoryClose}
            >
              {categories.map((category) => (
                <MenuItem key={category} onClick={handleCategoryClose}>
                  {category}
                </MenuItem>
              ))}
            </Menu>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {item.title}
              </Link>
            ))}

            {/* Become a Vendor */}
            <Link to="/vendor/register" className="ml-auto">
              <Button
                startIcon={<Store />}
                className="text-gray-700 hover:text-blue-600"
              >
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box className="w-72">
          <List>
            <ListItem className="px-4 py-2">
              <InputBase
                placeholder="Search products..."
                className="w-full px-4 py-1 border border-gray-300 rounded-md"
              />
            </ListItem>

            <ListItem>
              <ListItemText primary="Menu" className="font-bold" />
            </ListItem>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.title}
                component={Link}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            ))}

            <Divider className="my-2" />

            <ListItem>
              <ListItemText primary="Categories" className="font-bold" />
            </ListItem>
            {categories.map((category) => (
              <ListItem button key={category} className="pl-8">
                <ListItemText primary={category} />
              </ListItem>
            ))}

            <Divider className="my-2" />

            <ListItem button>
              <ListItemText primary="Become a Vendor" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Wishlist" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
