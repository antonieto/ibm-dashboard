/** @type {import('next').NextConfig} */

const getDatabaseUrl = () => {
  if (process.env.VERCEL_ENV === undefined) {
    return `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:5432/local`;
  }
  const env = process.env.VERCEL_ENV;
  let dbName = '';
  if (env === 'production') {
    dbName = 'production';
  } else if (env === 'staging') {
    dbName = 'staging';
  } else if (env === 'preview') {
    dbName = `pr${process.env.VERCEL_GIT_PULL_REQUEST_ID}`;
  } else {
    throw new Error('Failed to get database name');
  }
  return `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${dbName}`;
};

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    // Rewrite DATABASE_URL
    DATABASE_URL: getDatabaseUrl(),
  },
};

module.exports = nextConfig;
