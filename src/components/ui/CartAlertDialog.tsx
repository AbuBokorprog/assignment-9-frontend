import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { toast } from 'sonner';
import { useReplaceCartMutation } from '../../redux/features/api/carts/carts.api';

type CartAlertDialogProps = {
  open: boolean;
  setOpen: any;
  orderData: any;
};

const CartAlertDialog: React.FC<CartAlertDialogProps> = ({
  open,
  setOpen,
  orderData,
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [replaceCart] = useReplaceCartMutation();

  const replaceCartHandler = async () => {
    const toastId = toast.loading('Loading...');

    try {
      const res = await replaceCart(orderData).unwrap();

      if (res?.success) {
        toast.success('Add to cart successfully!', {
          id: toastId,
          duration: 200,
        });
      } else if (res?.status === 409) {
        setOpen(true);
      }
    } catch (error: any) {
      console.log(error);
      toast.success(error, { id: toastId, duration: 200 });
    }
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cart Alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your cart already contains items from another vendor. Would you like
            to replace the cart with products from new vendor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => replaceCartHandler}>Replace Cart</Button>
          <Button onClick={handleClose} autoFocus>
            Retain Cart
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CartAlertDialog;
