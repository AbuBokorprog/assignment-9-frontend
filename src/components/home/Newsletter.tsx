import { CiMail } from 'react-icons/ci';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateNewsletterMutation } from '../../redux/features/api/newsletter/newsletter.api';
import { toast } from 'sonner';

const Newsletter: React.FC = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const [subscribeNewsletter] = useCreateNewsletterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await subscribeNewsletter(data).unwrap();
      toast.success(res?.message);
      if (res?.success) {
        reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="bg-primary-600 py-8 px-2 text-white my-5 lg:my-10">
      <div className="mx-auto container">
        <div className="lg:flex items-center w-full justify-between gap-5 mx-auto">
          <div className="lg:flex items-center gap-4 w-full lg:w-1/2 text-center lg:text-left">
            <CiMail className="size-14 mx-auto lg:mx-0" />
            <div>
              <h5 className="text-xl font-semibold">
                Join our newsletter and get 20% discount for your first order
              </h5>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
            <form
              className="flex items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                placeholder="Enter your email"
                type="email"
                className="text-white p-5 w-full rounded-l-md"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">Email is required!</p>
              )}
              <button className="bg-black text-white p-5 rounded-r-2xl font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
