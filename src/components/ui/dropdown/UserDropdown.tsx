import React from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/features/auth-slice/AuthSlice';
import { LuGitCompare } from 'react-icons/lu';
import { FaProductHunt } from 'react-icons/fa';
import { useMyProfileQuery } from '../../../redux/features/api/users/user.api';

interface UserDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen, setIsOpen }) => {
  const user: any = useAppSelector(currentUser);
  const { data } = useMyProfileQuery({});
  const dispatch = useDispatch();
  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const profilePhoto = data?.data?.customer
    ? data?.data?.customer?.profilePhoto
    : data?.data?.vendor
    ? data?.data?.vendor?.profilePhoto
    : data?.data?.admin?.profilePhoto;

  return (
    <div className="relative">
      <Button onClick={toggleDrawer(true)} color="inherit" variant="text">
        {profilePhoto ? (
          <img
            src={profilePhoto}
            alt={user?.name}
            className="size-16 rounded-full border"
          />
        ) : (
          <PersonIcon className="size-14 min-w-0 rounded-full bg-gray-200" />
        )}
      </Button>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer(false)}
        anchor="right"
        PaperProps={{
          sx: {
            width: 320,
            backgroundColor: 'white',
          },
        }}
      >
        <Box className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-semibold">Account</h2>
            <IconButton onClick={toggleDrawer(false)} size="small">
              <CloseIcon />
            </IconButton>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {user?.role === 'CUSTOMER' ? (
              <>
                {/* User Profile Section */}
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <img
                      src={profilePhoto}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link
                    to="/dashboard/my-profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    // onClick={() => setIsOpen(false)}
                  >
                    <PersonIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/dashboard/my-orders"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingBagIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span>My Orders</span>
                  </Link>

                  <Link
                    to="dashboard/my-wishlist"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FavoriteIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    to="/comparison"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LuGitCompare className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Comparison</span>
                  </Link>
                  <Link
                    to="/my-recent-products"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaProductHunt className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Recent Products</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <SettingsIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Settings</span>
                  </Link>
                </div>
              </>
            ) : user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? (
              <>
                {/* User Profile Section */}
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.email}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link
                    to="/dashboard/my-profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <PersonIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/dashboard/admin-dashboard"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <SettingsIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Settings</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* User Profile Section */}
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.email}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link
                    to="/dashboard/my-profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    // onClick={() => setIsOpen(false)}
                  >
                    <PersonIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/dashboard/vendor-dashboard"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <SettingsIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Settings</span>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {user?.email && (
            <div className="border-t p-4">
              <button
                className="flex w-full items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => logoutHandler()}
              >
                <LogoutIcon className="mr-3 h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </Box>
      </Drawer>
    </div>
  );
};

export default UserDropdown;
