import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import React, { useState } from 'react';
import { TCoupon } from '../../../types/coupon.type';
import { FaEdit, FaEllipsisV, FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import { useDeleteCouponMutation } from '../../../redux/features/api/coupon/coupon.api';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';

type TCouponProps = {
  coupon: TCoupon;
};

const CouponCard: React.FC<TCouponProps> = ({ coupon }) => {
  const [isCopy, setCopy] = useState<boolean>(false);
  const user = useAppSelector(currentUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [deleteCoupon, { isLoading }] = useDeleteCouponMutation();

  const handleDeleteClick = async (id: string) => {
    const toastId = toast.loading('Loading...');
    try {
      const res = await deleteCoupon(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const couponCopyHandler = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopy(true);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Card className="relative">
        {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
          <div className="absolute top-0 right-0">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <FaEllipsisV />
            </IconButton>
          </div>
        )}
        <CardContent>
          <Typography variant="h4" component={'h4'}>
            {coupon?.name}
          </Typography>
          <Typography variant="h6" component={'h6'}>
            {coupon?.discount} TK.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
            }}
            component={'h6'}
            onClick={() => couponCopyHandler(coupon?.code)}
          >
            {coupon?.code} {isCopy ? <ContentPasteIcon /> : <CheckIcon />}
          </Typography>
        </CardContent>
      </Card>

      {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
        <div>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: 100,
                  width: '20ch',
                },
              },
            }}
          >
            <Link to={`/dashboard/admin/edit-coupon/${coupon?.id}`}>
              <MenuItem>
                <FaEdit className="mr-2" /> Edit Coupon
              </MenuItem>
            </Link>

            <MenuItem
              onClick={() => handleDeleteClick(coupon.id)}
              className="text-red-500"
            >
              <FaTrash className="mr-2" /> Delete Coupon
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default CouponCard;
