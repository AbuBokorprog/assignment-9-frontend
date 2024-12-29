import { Skeleton } from '@mui/material';

const ViewCartSkeleton = () => {
  return (
    <>
      <section className="container mx-auto">
        {/* <!-- Table for large device--> */}
        <div className="hidden lg:block">
          <div className="relative overflow-x-auto mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-base_500">
              <thead className="text-md text-base_700 uppercase bg-base">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    <Skeleton />
                  </th>
                  <th scope="col" className="py-4">
                    <Skeleton width={250} />
                  </th>
                  <th scope="col" className="p-4">
                    <Skeleton width={100} />
                  </th>
                  <th scope="col" className="px-4 py-4">
                    <Skeleton width={100} />
                  </th>
                  <th scope="col" className="p-4">
                    <Skeleton width={100} />
                  </th>
                  <th scope="col" className="p-2">
                    <Skeleton width={100} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((cProduct) => (
                  <tr
                    className="text-black border-b bg-base_300"
                    key={cProduct}
                  >
                    <td className="px-4 py-2">
                      <Skeleton width={120} height={120} />
                    </td>
                    <td className="p-2 font-medium text-md">
                      <h2 className="w-44 lg:w-96">
                        <Skeleton width={250} height={50} />
                      </h2>
                    </td>
                    <td className="px-4 py-2 font-medium whitespace-nowrap text-md">
                      <Skeleton width={100} />
                    </td>
                    <td className="font-medium whitespace-nowrap">
                      <p className="py-2 text-center rounded-md text-md">
                        <Skeleton width={150} />
                      </p>
                    </td>
                    <td className="px-4 py-2 font-medium whitespace-nowrap text-md">
                      <Skeleton width={100} />
                    </td>
                    <td className="px-6 py-2 text-center">
                      <Skeleton width={100} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="my-8 ">
            <Skeleton width={200} height={50} className="mx-auto" />
          </div>
        </div>

        {/* cart for small device */}
        <div className="block lg:hidden mt-8">
          <div className="flex items-center justify-between gap-5 border">
            <div className="w-1/3">
              <Skeleton width={120} height={120} />
            </div>
            <div className="w-2/3">
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
            <div>
              <Skeleton width={50} height={50} />
            </div>
          </div>

          <div className="text-center my-8">
            <Skeleton width={200} height={50} className="mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewCartSkeleton;
