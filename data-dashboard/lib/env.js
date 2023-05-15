const zod = require('zod');

const { z } = zod;

const EnvSchema = z.object({
  GITHUB_PERSONAL_ACCESS_TOKEN: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_HOST: z.string(),
  CUSTOM_ENV_NAME: z.string(),
});

const env = EnvSchema.parse(process.env);

module.exports = env;
