/* eslint-disable no-constant-condition */
import { Skeleton } from '@mui/material';

const CheckoutSkeleton = () => {
  return (
    <section className="my-5 lg:my-10 container mx-auto">
      <form className="lg:flex justify-between items-start gap-5 mx-auto min-h-full">
        <div className="w-full xl:w-2/3 rounded-md bg-white shadow-xl py-2 lg:py-10 px-2 lg:px-6 my-6 lg:my-0">
          <h3 className="text-xl lg:text-2xl font-semibold py-2">
            <Skeleton width={200} />
          </h3>
          <div className="lg:flex justify-between items-center gap-4 my-4">
            <div className="w-full">
              <Skeleton height={60} />
            </div>
            <div className="w-full">
              <Skeleton height={60} />
            </div>
          </div>
          <div className="my-4">
            <Skeleton height={60} />
          </div>
          <div className="my-4">
            <div className="mb-2">
              <Skeleton width={200} />
            </div>
            <div>
              <Skeleton width={200} />
            </div>
          </div>
        </div>
        <div className="w-full xl:w-1/3 bg-white rounded-md shadow-xl p-2 lg:p-6 h-fit">
          <div className="overflow-y-scroll h-[200px]">
            {1 > 0 ? (
              <>
                {[1, 2].map((cProducts) => (
                  <div
                    className="flex justify-between border items-center mx-auto gap-4 my-4"
                    key={cProducts}
                  >
                    <div>
                      <Skeleton height={100} width={100} />
                    </div>
                    <div className="w-72">
                      <Skeleton />
                      <h4 className="hidden lg:block">
                        <Skeleton />
                      </h4>
                      <div>
                        <p className="text-primary-500 font-medium">
                          <Skeleton />
                        </p>
                        <p>
                          <Skeleton />
                        </p>
                        <div className="flex items-center gap-2 mx-auto">
                          <Skeleton width={50} />
                          <Skeleton width={50} />
                        </div>
                      </div>
                    </div>
                    <Skeleton width={30} height={30} />
                  </div>
                ))}
              </>
            ) : (
              <Skeleton />
            )}
          </div>

          <hr className="border my-2" />
          <div>
            <div className="flex justify-between my-1 items-center">
              <Skeleton width={80} />
            </div>
            <div className="flex justify-between my-1 items-center">
              <Skeleton width={80} />
            </div>
            <hr className="border my-2" />
            <div className="flex justify-between items-center">
              <Skeleton width={80} />
              <Skeleton width={80} />
            </div>
            <div className="mt-4">
              <div>
                <Skeleton width={80} />
              </div>
              <div className="mt-2">
                <Skeleton width={150} className="mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutSkeleton;
