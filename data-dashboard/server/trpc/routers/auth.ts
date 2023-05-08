import { createHash, randomUUID } from 'crypto';
import { z } from 'zod';
import { sign } from 'jsonwebtoken';
import { router, publicProcedure } from '..';

const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const authRouter = router({
  signup: publicProcedure
    .input(SignupSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, confirmPassword } = input;
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const hashed = createHash('sha256').update(password).digest('hex');

      const user = await ctx.usersRepository.create({
        email,
        password: hashed,
        createdAt: new Date(),
        id: randomUUID(),
      });
      return {
        user,
      };
    }),
  login: publicProcedure
    .input(SigninSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const user = await ctx.usersRepository.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      const hashed = createHash('sha256').update(password).digest('hex');
      if (hashed !== user.password) {
        throw new Error('Invalid password');
      }
      const token = sign({ userId: user.id }, 'chairesesunindividuomuyguapo', { expiresIn: '1m' });

      return token;
    }),
});

export default authRouter;
