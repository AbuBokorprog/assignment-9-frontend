import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Badge,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Divider,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoriesList from '../ui/dropdown/CategoryList';
import CartDropdown from '../ui/dropdown/CartDropdown';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import UserDropdown from '../ui/dropdown/UserDropdown';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

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
    { title: 'All Products', path: '/all-products' },
    { title: 'Shop', path: '/shop' },
    { title: 'Flash Sale', path: '/flash-sale' },
    { title: 'About', path: '/about' },
  ];

  const searchHandler = (e: any) => {
    e.preventDefault();

    const search = e.target.search.value;
    navigate(`/product-search/${search}`);
  };

  return (
    <AppBar position="sticky" className="bg-white shadow-md">
      {/* Large device */}
      <nav className="border-y hidden lg:block bg-secondary-50 text-black">
        {/* 1st layer */}
        <div className="flex items-center justify-between mx-auto container px-4 gap-4 py-2">
          <Link to={'/'}>
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              alt="logo"
              className=""
            />
          </Link>
          <div className="">
            <form
              className="pt-2 flex items-center mx-auto"
              onSubmit={searchHandler}
            >
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="xl:w-[600px] lg:w-[400px] bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5"
                  placeholder="Search..."
                  required
                />
              </div>
              <Button
                type="submit"
                variant="outlined"
                className="inline-flex items-center py-2 px-3 ms-2"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                Search
              </Button>
            </form>
          </div>
          <Link to={'/become-vendor'} className="">
            <Button variant="contained">Become a vendor</Button>
          </Link>
          <div
            className="relative inline-block text-left"
            onMouseLeave={() => setIsOpenCart(false)}
          >
            <button onMouseEnter={() => setIsOpenCart(true)}>
              <Badge badgeContent={2} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </button>
            <div className="origin-top-right absolute right-0 w-80 rounded-md shadow-lg bg-white focus:outline-none z-30">
              <CartDropdown isOpen={isOpenCart} setIsOpen={setIsOpenCart} />
            </div>
          </div>
        </div>
        {/* 2nd layer */}
        <div className="bg-primary-500 py-3">
          <div className="container mx-auto flex items-center justify-between gap-10 px-2">
            {/* categories list dropdown */}
            <div
              className="relative"
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <Button
                onMouseEnter={() => setIsCategoryOpen(true)}
                variant="contained"
                type="button"
                color="secondary"
                className="space-x-20"
              >
                <span>Categories</span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </Button>

              <div
                onMouseLeave={() => setIsCategoryOpen(false)}
                className="absolute w-full bg-white"
              >
                {/* <!-- Dropdown menu --> */}
                <div>{isCategoryOpen && <CategoriesList />}</div>
              </div>
            </div>
            {/* menu items */}
            <div>
              <ul className="flex items-center mx-auto gap-5 font-medium">
                {menuItems?.map((n) => (
                  <li key={n?.title}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? 'text-primary-400 bg-white px-4 py-2 rounded-md shadow-md'
                          : 'px-4 py-2 rounded-md shadow-md bg-white text-secondary-950'
                      }
                      to={n?.path}
                    >
                      {n?.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* user dropdown */}
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
              <div className="">
                <UserDropdown
                  isOpen={isUserDropdownOpen}
                  setIsOpen={setIsUserDropdownOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/*Navbar for small device */}
      <nav className="block lg:hidden text-black">
        {/* top navbar */}
        <div className=" bg-white border">
          <div className="w-full flex items-center px-2 py-2 justify-between ">
            <button onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon />
            </button>
            <Link to={'/'}>
              <img
                src="https://super-admin.masemart.com/setting/1727638699.png"
                alt="logo"
                className="w-52"
              />
            </Link>
            <div className="px-2 pb-2 hidden sm:block">
              <form
                className="flex items-center max-w-sm mx-auto"
                onSubmit={searchHandler}
              >
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="search"
                    className="bg-secondary-50 border  border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-[300px] mx-auto p-2.5"
                    placeholder="Search..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 ms-2 text-sm font-medium text-white bg-primary-500 rounded-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
            <div className="flex items-center gap-4 ">
              <div
                className="relative inline-block text-left"
                onMouseLeave={() => setIsOpenCart(false)}
              >
                <button onMouseEnter={() => setIsOpenCart(true)}>
                  <Badge badgeContent={2} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </button>
                <div className="origin-top-right absolute right-0 w-60 md:w-80 rounded-md shadow-lg bg-white focus:outline-none z-30">
                  <CartDropdown isOpen={isOpenCart} setIsOpen={setIsOpenCart} />
                </div>
              </div>
              <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div className="">
                  <UserDropdown
                    isOpen={isUserDropdownOpen}
                    setIsOpen={setIsUserDropdownOpen}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 pb-2 block sm:hidden">
            <form
              className="flex items-center max-w-sm mx-auto"
              onSubmit={searchHandler}
            >
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="search"
                  className="bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full mx-auto p-2.5"
                  placeholder="Search..."
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-primary-500 rounded-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
        </div>

        {/* bottom navbar */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto bg-secondary-50 z-30 p-2 shadow-md border-t-2">
          <div className="flex items-center justify-between">
            <Link to={'/'} className="mx-auto text-center">
              <HomeIcon />
              <p>Home</p>
            </Link>
            <Link
              to={'/all-products'}
              className="mx-auto text-center"
              title="All Products"
            >
              <WidgetsIcon />
              <p>All Products</p>
            </Link>
            <Link className="mx-auto text-center" to={'/shop'} title="Shops">
              <LocalMallIcon />
              <p>Shops</p>
            </Link>
            <Link
              className="mx-auto text-center"
              to={'/view-cart'}
              title="Cart"
            >
              <Badge badgeContent={2} color="primary">
                <ShoppingCartIcon />
              </Badge>
              <p>Cart</p>
            </Link>
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
      </nav>
    </AppBar>
  );
};

export default Header;
