import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name is required!'),
  images: z.array(
    z.object({
      file: z.instanceof(File).optional(),
    }) || z.string().optional()
  ),
  description: z.string().min(1, 'description is required!'),
  regular_price: z.string().min(1, 'Regular price is required!'),
  discount_price: z.string().min(1, 'Regular price is required!'),
  inventory: z.string().min(1, 'Inventory is required!'),
  productStatus: z.enum(['REGULAR', 'FLASH_SALE', 'NEW', 'HOT', 'DISCOUNT']),
  shopId: z.string().min(2, 'shopId is required!'),
  categoryId: z.string().min(2, 'shopId is required!'),
  productSize: z
    .array(
      z.object({
        size: z.string().optional(),
        stock: z.string().optional(),
      })
    )
    .optional(),
  productColors: z
    .array(
      z.object({
        color: z.string().optional(),
        colorCode: z.string().optional(),
        colorStock: z.string().optional(),
      })
    )
    .optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(2, 'Name is required!').optional(),
  images: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
      })
    )
    .optional(),
  description: z.string().min(1, 'description is required!').optional(),
  regular_price: z.string().min(1, 'Regular price is required!').optional(),
  discount_price: z.string().min(1, 'Regular price is required!').optional(),
  inventory: z.string().min(1, 'Inventory is required!').optional(),
  productStatus: z
    .enum(['REGULAR', 'FLASH_SALE', 'NEW', 'HOT', 'DISCOUNT'])
    .optional(),
  shopId: z.string().min(2, 'shopId is required!').optional(),
  categoryId: z.string().min(2, 'shopId is required!').optional(),
  productSize: z
    .array(
      z.object({
        size: z.string().optional(),
        stock: z.string().optional(),
      })
    )
    .optional(),
  productColors: z
    .array(
      z.object({
        color: z.string().optional(),
        colorCode: z.string().optional(),
        colorStock: z.string().optional(),
      })
    )
    .optional(),
});
