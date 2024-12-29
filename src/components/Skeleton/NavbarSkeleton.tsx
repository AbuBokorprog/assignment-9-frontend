import { Skeleton } from '@mui/material';

const NavbarSkeleton = () => {
  return (
    <header className="">
      {/* Navbar for large device */}
      <nav className="border-y hidden md:block fixed top-0 left-0 right-0 bg-secondary-50 z-50">
        {/* part 1 */}
        <div className="flex items-center justify-between mx-auto container px-4 gap-4 py-2">
          <Skeleton variant="rectangular" width={100} height={60} />
          <div className="">
            <Skeleton variant="rectangular" width={600} height={40} />
            <div className="py-2 mx-auto hidden lg:block ">
              <Skeleton variant="text" width={400} />
            </div>
          </div>
          <Skeleton variant="rectangular" width={150} height={50} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        {/* part 2 */}
        <div className="bg-primary-200 py-3">
          <div className="container mx-auto flex items-center justify-start gap-10 px-2">
            <Skeleton variant="rectangular" width={120} height={40} />
            <div>
              <Skeleton variant="text" width={400} />
            </div>
          </div>
        </div>
      </nav>

      {/*Navbar for small device */}
      <nav className="block md:hidden">
        <div className="bg-white border">
          <div className="w-full flex items-center px-2 py-2 justify-between ">
            <Skeleton variant="rectangular" width={100} height={60} />
            <div className="px-2 pb-2 hidden sm:block">
              <Skeleton variant="rectangular" width={300} height={40} />
            </div>
            <div className="flex items-center gap-4 ">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </div>
          <div className="px-2 pb-2 block sm:hidden">
            <Skeleton variant="rectangular" width="100%" height={40} />
          </div>
        </div>

        {/* fixed */}
        <div className="fixed bottom-0 left-0 right-0 mx-auto bg-secondary-50 z-30 p-2 shadow-md border-t-2">
          <div className="flex items-center justify-between">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarSkeleton;
