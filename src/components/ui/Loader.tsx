import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <div className="h-screen fixed inset-0 z-[99] flex items-center justify-center bg-primary-50/40 backdrop-blur-md ">
      <CircularProgress />
    </div>
  );
};

export default Loader;
