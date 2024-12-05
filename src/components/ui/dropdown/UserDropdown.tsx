import React from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/features/auth-slice/AuthSlice';

interface UserDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type TUser = {
  email: string;
  name: string;
  role: string;
};

const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen, setIsOpen }) => {
  const user: any = useAppSelector(currentUser);
  const dispatch = useDispatch();
  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleDrawer(true)}
        className="min-w-0 p-2 border rounded-full bg-gray-200"
        color="inherit"
      >
        <PersonIcon className="h-8 w-8" />
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
            {user?.role === 'CUSTOMER' && (
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
                    to="/settings"
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
