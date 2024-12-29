import Skeleton from '@mui/material/Skeleton';

const DetailsSkeleton = () => {
  return (
    <div>
      <section className="container mx-auto px-2 my-6 ">
        <div className="md:flex mx-auto justify-between items-start gap-4 xl:gap-8">
          {/* <!-- product slider --> */}
          <div className="w-full md:w-1/2 mx-auto">
            <Skeleton variant="rectangular" height={500} />
          </div>

          {/* <!-- Product information --> */}
          <div className="w-full md:w-1/2 mx-auto" id="">
            <h2 className="text-xl lg:text-2xl font-semibold text-center lg:text-left">
              <Skeleton variant="text" height={50} />
            </h2>
            <Skeleton variant="text" width={200} />
            <div className=" my-4 flex justify-center md:justify-start items-center gap-2 font-medium">
              <Skeleton variant="text" width={100} height={30} />
              <Skeleton variant="text" width={100} height={30} />
            </div>
            <div className="my-1">
              <Skeleton variant="text" width={200} />
            </div>
            <div>
              <Skeleton variant="text" width={200} />
            </div>

            <form>
              <div
                className="my-4 flex items-center justify-center md:justify-start gap-6"
                id="buttonGroup"
              >
                <div className="flex flex-col">
                  <div className="flex flex-wrap space-x-1 justify-start items-center h-fit my-2">
                    {[1, 2, 3, 4].map((c) => (
                      <div
                        key={c}
                        className="size-10 rounded-full bg-secondary-200 animate-pulse"
                      ></div>
                    ))}
                  </div>

                  <div className="flex flex-wrap space-x-1 h-fit my-2 justify-center items-center">
                    {[1, 2, 3, 4].map((s) => (
                      <div key={s}>
                        <Skeleton variant="text" width={50} height={50} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className=" my-2">
                <div className="w-full">
                  <Skeleton variant="text" height={70} />
                </div>
                <div className="w-full">
                  <Skeleton variant="text" height={70} />
                </div>
              </div>
            </form>

            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        </div>
        <div className="my-8">
          <div className="flex justify-center items-center gap-4">
            <Skeleton variant="text" height={50} width={150} />
            <Skeleton variant="text" height={50} width={150} />
            <Skeleton variant="text" height={50} width={150} />
          </div>
          <div>
            <Skeleton variant="text" height={400} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailsSkeleton;
