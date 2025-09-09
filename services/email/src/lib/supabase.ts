import { createClient } from '@supabase/supabase-js';
import { validateServerEnv } from '@teamhunt/shared';

const env = validateServerEnv();
export const supabase = createClient(
  env.SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY!
);