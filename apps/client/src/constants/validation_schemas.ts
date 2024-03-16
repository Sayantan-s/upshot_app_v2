import { z } from 'zod';

const alphaNumeric = /^[a-zA-Z0-9_]{3,30}$/;
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
export default class ValidationSchema {
  public static register = z
    .object({
      userName: z
        .string({ required_error: 'UserName is required!' })
        .nonempty({ message: 'Username is required!' })
        .min(4, { message: 'Username must be at least 4 characters long.' })
        .max(20, { message: 'Username cannot exceed 20 characters.' })
        .refine((value) => alphaNumeric.test(value), {
          message: 'Should contain letters and numbers!',
        }),
      email: z
        .string()
        .nonempty('Email is required!')
        .email('Email format is not valid!'),
      pwd: z
        .string()
        .nonempty('Password is required!')
        .min(8, { message: 'Password should be more than 7 characters!' })
        .max(20, { message: 'Password should be less than 21 characters!' }),
      confirm: z.string(),
    })
    .refine((data) => data.pwd === data.confirm, {
      message: "Password doesn't match!",
      path: ['confirm'],
    });
  public static login = z.object({
    identity: z
      .string({ required_error: 'Identity is required!' })
      .nonempty({ message: 'Identity is required!' })
      .min(7, { message: 'Identity must be at least 4 characters long.' })
      .max(30, { message: 'Identity cannot exceed 20 characters.' }),
    pwd: z.string().nonempty('Password is required!'),
  });

  public static productIdenity = z.object({
    productName: z
      .string({ required_error: 'Product name is required!' })
      .nonempty({ message: 'Product name is required!' })
      .min(2, { message: 'Identity must be at least 2 characters long.' }),
    productMoto: z
      .string({ required_error: 'Product motot is required!' })
      .nonempty({ message: 'Product moto is required!' })
      .min(20, { message: 'Product moto must be at least 20 characters long.' })
      .max(100, { message: 'Product moto cannot exceed 100 characters.' }),
  });

  public static productDescription = z.object({
    productDescription: z
      .string({ required_error: 'Product description is required!' })
      .nonempty({ message: 'Product description is required!' })
      .min(50, {
        message: 'Product description must be at least 50 characters long.',
      })
      .max(600, {
        message: 'Product description cannot exceed 300 characters.',
      }),
    price: z.object({
      amount: z
        .number({ required_error: 'Product price is required!' })
        .min(99, {
          message: 'Product description must be at least 50 characters long.',
        }),
      currency: z
        .number({ required_error: 'Product price is required!' })
        .min(99, {
          message: 'Product description must be at least 50 characters long.',
        }),
    }),
    tags: z
      .array(
        z.object({
          value: z.string(),
          displayValue: z.string(),
        })
      )
      .nonempty({
        message: 'You must add tags to describe your product genre!',
      })
      .min(2, {
        message: 'You must add atleast 2 tags to describe your product genre!',
      })
      .max(4, {
        message: 'You cannot add more than 4 tags!',
      }),
  });

  public static productMedia = z.object({
    productLogo: z.string().nonempty({ message: 'Product Logo is required!' }),
    productCover: z
      .string()
      .nonempty({ message: 'Product Cover is required!' }),
  });

  public static productMediaFile = z
    .any()
    .refine(
      (file: File) => file?.size <= MAX_FILE_SIZE,
      `Max image size is 2MB.`
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    );
}
