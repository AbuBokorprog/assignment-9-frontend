import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@mui/material';
import { useGetAllCategoriesQuery } from '../../../redux/features/api/categories/catgeories.api';
import { TCategory } from '../../../types/categories.type';

const CategoriesList: React.FC = () => {
  const [isOpenSubcategory, setIsOpenSubcategory] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetAllCategoriesQuery({});

  const handleClickOutside = (event: MouseEvent) => {
    if (
      categoryRef.current &&
      !categoryRef.current.contains(event.target as Node)
    ) {
      setIsOpenSubcategory(false);
    }
  };

  useEffect(() => {
    if (isOpenSubcategory) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenSubcategory]);

  return (
    <div
      ref={categoryRef}
      className="relative w-full rounded-lg z-30"
      onMouseLeave={() => setIsOpenSubcategory(false)}
    >
      {/* Main category */}
      <Card className="h-96 lg:h-72 2xl:h-[455px] border border-primary-500">
        <ul className="overflow-y-scroll h-full">
          {data?.data.map((category: TCategory, index: number) => (
            <li key={index}>
              <Link
                to={`/all-products/?category=${category?.name}`}
                className="text-secondary-900 w-full hover:text-secondary-50 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-3 py-2.5 flex text-center items-center justify-between"
              >
                <img src={category?.image} alt="" className="size-24" />
                <span>
                  {category.name.length > 18
                    ? `${category.name.slice(0, 18)}...`
                    : category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default CategoriesList;
