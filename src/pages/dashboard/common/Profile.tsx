import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaCamera, FaUserCircle } from 'react-icons/fa';
import { useMyProfileQuery } from '../../../redux/features/api/users/user.api';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Loader from '../../../components/ui/Loader';

const Profile: React.FC = () => {
  const [avatar, setAvatar] = useState<any>();
  const [image, setImage] = useState<File | any>(null);
  const { email }: any = useAppSelector(currentUser);
  const [isEditing, setIsEditing] = useState(false);

  const { data, refetch, isLoading } = useMyProfileQuery({});

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data?.data?.name,
      email: data?.data?.email,
      contactNumber: data?.data.vendor
        ? data?.data?.vendor?.contactNumber
        : data?.data?.admin
        ? data?.data?.admin?.contactNumber
        : data?.data?.customer?.contactNumber,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('data', JSON.stringify(data));
    console.log(data);

    setIsEditing(false);
  };

  useEffect(() => {
    refetch();
  }, [email]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">My Profile</h2>

            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    {data?.data.profilePhoto ? (
                      <img
                        src={avatar ? avatar : data?.data.profilePhoto}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="w-32 h-32 text-gray-400" />
                    )}
                    <label
                      htmlFor="profilePhoto"
                      className="absolute bottom-0 right-0 bg-primary-500 p-2 rounded-full cursor-pointer hover:bg-primary-600 transition-colors"
                    >
                      <FaCamera className="text-white" />
                      <input
                        type="file"
                        id="profilePhoto"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      value={
                        data?.data.vendor
                          ? data?.data?.vendor?.name
                          : data?.data?.admin
                          ? data?.data?.admin?.name
                          : data?.data?.customer?.name
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                    />
                  </div>

                  <div className="flex items-center">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        defaultValue={data?.data.email}
                        disabled={true}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        {...register('contactNumber')}
                        value={
                          data?.data.vendor
                            ? data?.data?.vendor?.contactNumber
                            : data?.data?.admin
                            ? data?.data?.admin?.contactNumber
                            : data?.data?.customer?.contactNumber
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center mt-6 space-x-4">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <Button
                        type="submit"
                        variant="contained"
                        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                      >
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <div className="text-center mx-auto">
                      <Button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
