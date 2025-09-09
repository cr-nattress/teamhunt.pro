// Environment validation
export {
  serverEnvSchema,
  clientEnvSchema,
  validateServerEnv,
  validateClientEnv,
  type ServerEnv,
  type ClientEnv,
} from './env';

// Shared types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Hunt {
  id: string;
  title: string;
  description: string;
  teamId: string;
  status: 'draft' | 'active' | 'completed';
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}