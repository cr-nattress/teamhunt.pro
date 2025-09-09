import { z } from 'zod';

// Server environment schema
export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  EMAIL_API_KEY: z.string().optional(),
  MEDIA_BUCKET: z.string().optional(),
});

// Client environment schema
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('TeamHunt'),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;

export const validateServerEnv = () => {
  try {
    return serverEnvSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid server environment variables:', error);
    process.exit(1);
  }
};

export const validateClientEnv = () => {
  try {
    return clientEnvSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid client environment variables:', error);
    process.exit(1);
  }
};