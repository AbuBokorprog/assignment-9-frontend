import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@mui/material';

// Define interfaces for our data structure
interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

// Dummy data
const dummyCategories: Category[] = [
  {
    name: 'Electronics',
    slug: 'electronics',
    subcategories: [
      { name: 'Smartphones', slug: 'smartphones' },
      { name: 'Laptops', slug: 'laptops' },
      { name: 'Tablets', slug: 'tablets' },
    ],
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    subcategories: [
      { name: 'Men', slug: 'men' },
      { name: 'Women', slug: 'women' },
      { name: 'Kids', slug: 'kids' },
    ],
  },
  {
    name: 'Books',
    slug: 'books',
    subcategories: [
      { name: 'Fiction', slug: 'fiction' },
      { name: 'Non-Fiction', slug: 'non-fiction' },
      { name: 'Educational', slug: 'educational' },
    ],
  },
];

const CategoriesList: React.FC = () => {
  const [isOpenSubcategory, setIsOpenSubcategory] = useState(false);
  const [subcategory, setSubcategory] = useState<string | null>(null);

  const categoryRef = useRef<HTMLDivElement>(null);

  const subCategoryHandler = (category: string) => {
    setIsOpenSubcategory(true);
    setSubcategory(category);
  };

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

  const subCategory = dummyCategories.find((c) => c.slug === subcategory);

  return (
    <div
      ref={categoryRef}
      className="relative w-full rounded-lg z-30"
      onMouseLeave={() => setIsOpenSubcategory(false)}
    >
      {/* Main category */}
      <Card className="h-96 lg:h-72 2xl:h-[455px] border border-primary-500">
        <ul className="overflow-y-scroll h-full">
          {dummyCategories.map((category, index) => (
            <li
              key={index}
              onMouseEnter={() => subCategoryHandler(category.slug)}
            >
              <Link
                to={`/product-category/${category.slug}`}
                className="text-secondary-900 w-full hover:text-secondary-50 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-3 py-2.5 flex text-center items-center justify-between"
              >
                <span>
                  {category.name.length > 18
                    ? `${category.name.slice(0, 18)}...`
                    : category.name}
                </span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      {/* sub category */}
      {isOpenSubcategory && (
        <div>
          <Card className="absolute top-0 left-full w-52 bg-white z-20 overflow-y-scroll h-full">
            <ul>
              {subCategory?.subcategories.map((subcategory, index) => (
                <li key={index}>
                  <Link
                    to={`/product-subcategory/${subcategory.slug}`}
                    className="text-secondary-900 w-full hover:text-secondary-50 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-3 py-2 flex text-center items-center justify-between"
                    type="button"
                  >
                    <span>{subcategory.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
