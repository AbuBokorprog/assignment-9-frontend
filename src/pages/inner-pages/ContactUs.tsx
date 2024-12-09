import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    // eslint-disable-next-line no-unused-vars
    formState: { error },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <>
      {/* <!-- contact us section --> */}
      <section className="my-5 lg:my-10 container mx-auto">
        <h2 className="text-center text-xl lg:text-5xl font-medium">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 mx-auto items-center gap-5 my-10">
          <div className="bg-white rounded-md text-center w-full p-6 h-60">
            <img
              src="/assets/images/phone.png"
              alt=""
              className="w-20 mx-auto"
            />
            <p className="text-xl my-2">Phone</p>
            <p>6765</p>
          </div>
          <div className="bg-white rounded-md text-center w-full p-6 h-60">
            <img
              src="/assets/images/gmail.png"
              alt=""
              className="w-20 mx-auto"
            />
            <p className="text-xl my-2">Email</p>
            <p>bazzarbridge@gmail.com</p>
          </div>
          <div className="bg-white rounded-md text-center w-full p-6 h-60">
            <img
              src="/assets/images/location-pin.png"
              alt=""
              className="w-20 mx-auto"
            />
            <p className="text-xl my-2">Address</p>
            <p>Dhaka, Bangladesh.</p>
          </div>
        </div>
        {/* <!-- contact form --> */}
        <form
          action=""
          className="bg-white p-8 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="lg:flex items-center justify-between gap-6 mx-auto">
            <div className="w-full my-2">
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-dark"
              >
                Name
              </label>
              <input
                type="text"
                className="bg-primary-50 border border-base_300 text-dark rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="Enter your name"
                {...register('name', { required: true })}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="phone"
                className="block mb-2 font-medium text-dark"
              >
                Phone
              </label>
              <input
                type="tel"
                className="bg-primary-50 border border-base_300 text-dark rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="Enter your name"
                {...register('phone', { required: true })}
              />
            </div>
          </div>
          <div className="my-2">
            <label
              htmlFor="message"
              className="block mb-2 font-medium text-dark"
            >
              Message
            </label>
            <textarea
              cols={50}
              rows={30}
              placeholder="Type your message"
              className="bg-primary-50 border border-base_300 text-dark rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              {...register('message', { required: true })}
            ></textarea>
          </div>
          <div className="mt-4 text-center">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
        {/* <!-- map --> */}
        <div className="my-6 p-4 bg-white rounded-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4123137108154!2d90.39710567600126!3d23.8749937785856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c583734d8a25%3A0x43e08ed10e776c4!2sWebcoder-IT%20Institute!5e0!3m2!1sen!2sbd!4v1713958219341!5m2!1sen!2sbd"
            width="600"
            className="w-full rounded-md"
            height="450"
            allowFullScreen
            loading="lazy"
            title="video"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
