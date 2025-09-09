import { z } from 'zod';

// Server environment schema
export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  // Supabase Configuration
  SUPABASE_URL: z.string().default('https://hactsrhxcrujegduuqnn.supabase.co'),
  SUPABASE_ANON_KEY: z.string().default('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhY3Rzcmh4Y3J1amVnZHV1cW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDYwOTEsImV4cCI6MjA3MzAyMjA5MX0.rSxg1kTAo7roEExzos8EWX66U7llCoKJzIyr6SCN4Oc'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  // PostgreSQL Database (Supabase)
  DATABASE_URL: z.string().default('postgresql://postgres:Progressive!12@db.hactsrhxcrujegduuqnn.supabase.co:5432/postgres'),
  // Other services
  JWT_SECRET: z.string().optional(),
  EMAIL_API_KEY: z.string().optional(),
  MEDIA_BUCKET: z.string().optional(),
});

// Client environment schema
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('TeamHunt'),
  // Supabase Client Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().default('https://hactsrhxcrujegduuqnn.supabase.co'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().default('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhY3Rzcmh4Y3J1amVnZHV1cW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDYwOTEsImV4cCI6MjA3MzAyMjA5MX0.rSxg1kTAo7roEExzos8EWX66U7llCoKJzIyr6SCN4Oc'),
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