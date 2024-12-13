import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useUserRoleChangeMutation } from '../../../redux/features/api/users/user.api';
import { toast } from 'sonner';

type UserMenuProps = {
  userId: string;
};

const UserMenu: React.FC<UserMenuProps> = ({ userId }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userRoleUpdate] = useUserRoleChangeMutation();

  const updateUserRoleHandler = async (id: string, role: string) => {
    const toastId = toast.loading('Loading...');
    console.log(role);
    try {
      const res = await userRoleUpdate({ id: id, data: role }).unwrap();
      toast.success(res?.message, { id: toastId, duration: 200 });
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId, duration: 200 });
    }
  };

  return (
    <div>
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <FaEllipsisV />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => updateUserRoleHandler(userId, 'ADMIN')}>
            Admin
          </MenuItem>
          <MenuItem onClick={() => updateUserRoleHandler(userId, 'VENDOR')}>
            Vendor
          </MenuItem>
          <MenuItem onClick={() => updateUserRoleHandler(userId, 'CUSTOMER')}>
            User (Customer)
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default UserMenu;
