import { z, ZodError } from 'zod';

export default (password: string): string => {
  const passwordSchema = z.string().min(6).max(100);
  try {
    passwordSchema.parse(password);
    return '';
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors[0].message;
    }
    return 'Invalid password';
  }
};
