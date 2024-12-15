import { z } from 'zod';

export const orderSchema = z.object({
  city: z.string().nonempty('City is required.'),
  deliveryAddress: z.string().nonempty('Delivery address is required.'),
  deliveryArea: z.string().nonempty('Delivery area is required.'),
  email: z.string().email('Email is required!'),
  fullName: z.string().nonempty('Full name is required.'),
  paymentType: z.enum(['COD', 'ADV']),
  phoneNumber: z
    .string()
    .regex(
      /^01[3-9]\d{8}$/,
      'Phone number must be a valid Bangladeshi number.'
    ),
  postalCode: z
    .string()
    .regex(/^\d{4}$/, 'Postal code must be a 4-digit number.'),
});
