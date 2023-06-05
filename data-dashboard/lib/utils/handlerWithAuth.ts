import { verify } from 'jsonwebtoken';
import { AUTH_COOKIE } from '../constants';
import env from '../env';
import withContext, { HandlerWithContext } from './withContext';

const handlerWithAuth = (handler: HandlerWithContext) => withContext(async (ctx) => {
  const { req, res } = ctx;
  const token = String(req.cookies[AUTH_COOKIE]);
  if (!token ?? token === '') {
    return res.json({ error: 'No token' });
  }
  const decoded = verify(token, env.JWT_SECRET);
  if (!decoded) {
    return res.json({ error: 'Invalid token' });
  }
  const { userId } = decoded as { userId: string };
  ctx.user = async () => ctx.usersRepository.findById(userId);
  return handler(ctx);
});

export default handlerWithAuth;
