import 'dotenv/config';
import { z } from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    APP_URL: z.string().optional().default('http://localhost:3000'),
  });

  const envVars = {
    API_URL: process.env['NEXT_PUBLIC_API_URL'],
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    const errors = parsedEnv.error.flatten().fieldErrors;
    const errorMessage = Object.entries(errors)
      .map(([key, value]) => `- ${key}: ${value.join(', ')}`)
      .join('\n');

    throw new Error(`Invalid environment variables:\n${errorMessage}`);
  }

  return parsedEnv.data;
};

export const AppConfig = createEnv();
