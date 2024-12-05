import { z } from 'zod';

export const shopSchema = z.object({
  name: z.string().min(2, 'Name is required!'),
  shopLogo: z.object({ file: z.instanceof(File) }),
  shopCover: z.object({ file: z.instanceof(File) }),
  description: z.string().min(1, 'description is required!').optional(),
  categoryId: z.string().min(2, 'categoryId is required!'),
  address: z.string().min(2, 'Address is required'),
  registrationNumber: z.string().min(2, 'Address is required'),
});
