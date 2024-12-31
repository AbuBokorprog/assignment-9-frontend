import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Badge,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoriesList from '../ui/dropdown/CategoryList';
import CartDropdown from '../ui/dropdown/CartDropdown';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import UserDropdown from '../ui/dropdown/UserDropdown';
import { currentUser } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks/hooks';
import { useGetAllMyCartsQuery } from '../../redux/features/api/carts/carts.api';
import { useGetAllCategoriesQuery } from '../../redux/features/api/categories/catgeories.api';
import { TCategory } from '../../types/categories.type';
import CallIcon from '@mui/icons-material/Call';

const Header: React.FC = () => {
  const user: any = useAppSelector(currentUser);

  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'All Products', path: '/all-products' },
    { title: 'Shop', path: '/shop' },
  ];

  const menuItems2 = [
    { title: 'Home', path: '/' },
    { title: 'All Products', path: '/all-products' },
    { title: 'Shop', path: '/shop' },
    { title: 'Flash Sale', path: '/flash-sale' },
    { title: 'About us', path: '/about' },
    { title: 'Refund Policy', path: '/refund' },
  ];

  const searchHandler = (e: any) => {
    e.preventDefault();

    const search = e.target.search.value;

    navigate(`/all-products/${search}`);
  };

  const { data } = useGetAllMyCartsQuery({});
  const { data: categories } = useGetAllCategoriesQuery({});
  // const { data: profile, refetch } = useMyProfileQuery({});
  // const profilePhoto = profile?.data?.customer
  //   ? profile?.data?.customer?.profilePhoto
  //   : profile?.data?.vendor
  //   ? profile?.data?.vendor?.profilePhoto
  //   : profile?.data?.admin?.profilePhoto;

  window.addEventListener('scroll', () => {
    const height = window.scrollY;

    if (height >= 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  });

  return (
    <div className="bg-white shadow-md">
      {/* Large device */}
      <nav className="border-y hidden lg:block bg-secondary-50 text-black">
        <div className={``}>
          {/* 1st layer */}
          <div className="flex items-center justify-between mx-auto container px-2 gap-4">
            <Link to={'/'}>
              <img
                src="/images/bazaar-bridge.png"
                alt="logo"
                className="size-24"
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
                  <TextField
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
                  className="inline-flex items-center py-3.5 px-3 ms-2"
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
            <div className="flex items-center gap-4">
              <CallIcon className="size-8" />
              <div>
                <p>Hotline Number</p>
                <p>+8801885236058</p>
              </div>
            </div>
            <Link
              to={'https://bazaar-bridge-dashboard.vercel.app/become-vendor'}
              target="_blank"
            >
              <Button variant="contained" size="small">
                Become a vendor
              </Button>
            </Link>
            <div
              className="relative inline-block text-left px-2"
              onMouseLeave={() => setIsOpenCart(false)}
            >
              <button onMouseEnter={() => setIsOpenCart(true)}>
                <Badge badgeContent={data?.data?.length} color="primary">
                  <ShoppingCartIcon className="size-8" />
                </Badge>
              </button>
              <div className="origin-top-right absolute right-0 w-80 rounded-md shadow-lg bg-white focus:outline-none z-30">
                <CartDropdown isOpen={isOpenCart} setIsOpen={setIsOpenCart} />
              </div>
            </div>
          </div>
          {/* 2nd layer */}
          <div className="bg-primary-500 py-3 px-2">
            <div className="container mx-auto flex items-center justify-between gap-10">
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
                <ul className="flex items-center mx-auto gap-5 text-xl font-medium">
                  {menuItems2?.map((n) => (
                    <li key={n?.title}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? ' text-black font-medium'
                            : 'font-medium text-white'
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
              {user?.email ? (
                <div className="flex items-center md:order-2 rtl:space-x-reverse ">
                  <div className="">
                    <UserDropdown
                      isOpen={isUserDropdownOpen}
                      setIsOpen={setIsUserDropdownOpen}
                    />
                  </div>
                </div>
              ) : (
                <Link to={'/login'}>
                  <Button variant="contained" color="secondary">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* fixed navbar */}
        <div
          className={`bg-primary-500 py-3 px-2 fixed top-0 left-0 right-0 z-30 ${
            scroll ? 'block' : 'hidden'
          }`}
        >
          <div className="container mx-auto flex items-center justify-between gap-10">
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
              <ul className="flex items-center mx-auto gap-5 text-xl font-medium">
                {menuItems2?.map((n) => (
                  <li key={n?.title}>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? ' text-black font-medium'
                          : 'font-medium text-white'
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
            {user?.email ? (
              <div className="flex items-center md:order-2 rtl:space-x-reverse ">
                <div className="">
                  <UserDropdown
                    isOpen={isUserDropdownOpen}
                    setIsOpen={setIsUserDropdownOpen}
                  />
                </div>
              </div>
            ) : (
              <Link to={'/login'}>
                <Button variant="contained" color="secondary">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/*Navbar for small device */}
      <nav className="block lg:hidden text-black fixed top-0 left-0 right-0 z-50">
        {/* top navbar */}
        <div className=" bg-white border">
          <div className="w-full flex items-center py-2 justify-between ">
            <button onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon className="size-12" />
            </button>
            <Link to={'/'} className="text-primary-500">
              {/* <img
                src="/images/bazaar-bridge.png"
                alt="logo"
                className="size-24"
              /> */}
              Bazar Bridge
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
              {/* <div
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
              </div> */}
              {user?.email ? (
                <div className="flex items-center md:order-2 rtl:space-x-reverse ">
                  <div className="">
                    <UserDropdown
                      isOpen={isUserDropdownOpen}
                      setIsOpen={setIsUserDropdownOpen}
                    />
                  </div>
                </div>
              ) : (
                <Link to={'/login'}>
                  <Button variant="outlined" color="primary">
                    Login
                  </Button>
                </Link>
              )}
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
          <Box className="w-72 overflow-y-scroll">
            <Link to={'/'} className="text-primary-500 mx-auto">
              <img
                src="/images/bazaar-bridge.png"
                alt="logo"
                className="w-32 text-center mx-auto"
              />
            </Link>
            <List>
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

              {categories?.data?.map((category: TCategory) => (
                <ListItem button key={category.id} className="">
                  <Link to={`/all-products/?category=${category?.name}`}>
                    <ListItemText primary={category.name} />
                  </Link>
                </ListItem>
              ))}

              <ListItem
                button
                component={Link}
                to={'/flash-sale'}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItemText primary={'Flash Sale'} />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={'/about'}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItemText primary={'About'} />
              </ListItem>
              <ListItem>
                <Link
                  to={
                    'https://bazaar-bridge-dashboard.vercel.app/become-vendor'
                  }
                  target="_blank"
                >
                  <Button variant="contained" size="small">
                    Become a vendor
                  </Button>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </nav>
    </div>
  );
};

export default Header;
