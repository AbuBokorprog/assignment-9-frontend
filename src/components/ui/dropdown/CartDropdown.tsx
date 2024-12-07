import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { useGetAllMyCartsQuery } from '../../../redux/features/api/carts/carts.api';
import { CartProduct } from '../../../types/cart.type';

interface CartDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, setIsOpen }) => {
  const { data } = useGetAllMyCartsQuery({});

  const cartCount = data?.data?.length;

  const subTotal = data?.data?.reduce(
    (sum: number, item: CartProduct) => sum + item.price * item.qty,
    0
  );

  return (
    <div>
      {isOpen && (
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="px-4 py-3 text-black">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Shopping Bag ({cartCount})
              </h3>
              <Button onClick={() => setIsOpen(false)} variant="text">
                <CancelIcon />
              </Button>
            </div>
            <div className="h-60 overflow-y-scroll">
              {data?.data?.length > 0 ? (
                data?.data?.map((product: CartProduct, index: number) => (
                  <div className="mt-3 flex" key={index}>
                    <img
                      src={product.product.images[0]}
                      alt={product.product.name}
                      className="w-20 object-cover rounded"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-secondary-900">
                        {product.product.name}
                      </p>
                      <p className="text-sm text-primary-600 font-semibold">
                        ৳ {product?.price}
                      </p>
                      <p className="text-xs text-secondary-500">
                        Qty: {product.qty}
                      </p>
                      <p className="text-xs text-secondary-500">
                        Variant: {product.color ? product.color : 'None'}-
                        {product.size ? product.size : 'None'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p>You haven't added any products to cart.</p>
                </div>
              )}
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium text-secondary-900">
                Subtotal: <span className="font-semibold">৳ {subTotal}</span>
              </p>
            </div>

            {data?.data?.length === 0 ? (
              <div className="mt-4 flex space-x-2 mx-auto justify-center items-center">
                <Button
                  disabled
                  className="w-full bg-secondary-800 text-white py-2 px-4 rounded hover:bg-secondary-700 transition duration-200"
                >
                  View cart
                </Button>

                <Button
                  disabled
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 transition duration-200"
                >
                  Checkout
                </Button>
              </div>
            ) : (
              <div className="mt-4 flex space-x-2 mx-auto justify-center items-center">
                <Link to="/view-cart">
                  <button className="w-full bg-secondary-800 text-white py-2 px-4 rounded hover:bg-secondary-700 transition duration-200">
                    View cart
                  </button>
                </Link>
                <Link to="/checkout">
                  <button className="w-full bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 transition duration-200">
                    Checkout
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
