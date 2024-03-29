const zod = require('zod');

const { z } = zod;

const EnvSchema = z.object({
  GITHUB_PERSONAL_ACCESS_TOKEN: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_HOST: z.string(),
  CUSTOM_ENV_NAME: z.string(),
  AZURE_STORAGE_CONNECTION_STRING: z.string(),
  JWT_SECRET: z.string(),
  REDIS_CONNECTION_STRING: z.string()
    .optional()
    .default('redis://default:redispassword@localhost:6379'),
});


const env = EnvSchema.parse(process.env);

module.exports = env;
