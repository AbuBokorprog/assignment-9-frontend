import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name is required!'),
  images: z.array(
    z.object({
      file: z.instanceof(File).optional(),
    })
  ),
  description: z.string().min(1, 'description is required!'),
  regular_price: z.string().min(1, 'Regular price is required!'),
  discount_price: z.string().min(1, 'Regular price is required!'),
  inventory: z.string().min(1, 'Inventory is required!'),
  shopId: z.string().min(2, 'shopId is required!'),
  categoryId: z.string().min(2, 'shopId is required!'),
  productSize: z
    .array(
      z.object({
        size: z.string().min(1, 'Size is required'),
        stock: z.string(),
      })
    )
    .optional(),
  productColors: z
    .array(
      z.object({
        color: z.string().min(1, 'Color is required'),
        colorCode: z.string(),
        colorStock: z.string(),
      })
    )
    .optional(),
});
