import withContext from '@/lib/utils/withContext';

export default withContext(async ({ user, res, usersRepository }) => {
  const users = await usersRepository.findAll();
  const userData = await user();
  return res.status(200).json({ hello: 'world', user: userData, users });
});
