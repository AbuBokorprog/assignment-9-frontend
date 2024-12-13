import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useForgotPasswordMutation } from '../../redux/features/api/auth/auth.api';
import { toast } from 'sonner';

type TForgotPasswordProps = {
  open: boolean;
  setOpen: any;
};

const ForgotPassword: React.FC<TForgotPasswordProps> = ({ open, setOpen }) => {
  const { register, handleSubmit } = useForm();
  const handleClose = () => {
    setOpen(false);
  };

  const [ForgotPassword] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Loading...');
    try {
      const res = await ForgotPassword(data).unwrap();
      toast.success(res?.message, { id: toastId, duration: 200 });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Do you forgot your password?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Don't worry please submit your valid email and reset your
              password.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              {...register('email')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Send reset link</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default ForgotPassword;
