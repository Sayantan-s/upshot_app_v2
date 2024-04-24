import { ZodAny, ZodEffects, z } from 'zod';
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const MediaFileSchema: ZodEffects<ZodEffects<ZodAny>> = z
  .any()
  .refine((file: File) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
  .refine(
    (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  );
