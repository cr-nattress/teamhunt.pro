# Security Guidelines

Security is a critical aspect of the TeamHunt platform. This guide outlines security best practices and requirements for development.

## Authentication & Authorization

### Supabase Auth Integration

All authentication is handled through Supabase Auth:

```tsx
import { createClient } from '@supabase/supabase-js';

// Client-side authentication
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword',
});

// Protected routes
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  return redirect('/login');
}
```

### Row Level Security (RLS)

All database tables must have RLS enabled:

```sql
-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hunts ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Example RLS policy
CREATE POLICY "Users can only see their own organization's hunts"
  ON hunts FOR SELECT
  USING (organization_id IN (
    SELECT organization_id FROM user_organizations 
    WHERE user_id = auth.uid()
  ));
```

### API Authentication

All API endpoints must validate authentication:

```tsx
import { createClient } from '@supabase/supabase-js';

export const authenticateRequest = async (req: Request) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    throw new Error('No authorization token provided');
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    throw new Error('Invalid authentication token');
  }

  return user;
};
```

## Input Validation & Sanitization

### Zod Schema Validation

All inputs must be validated using Zod schemas:

```tsx
import { z } from 'zod';

export const createHuntSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(1000),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  organization_id: z.string().uuid(),
});

// API route validation
export const handler = async (req: Request) => {
  try {
    const body = createHuntSchema.parse(await req.json());
    // Process validated input
  } catch (error) {
    return Response.json({ error: 'Invalid input' }, { status: 400 });
  }
};
```

### SQL Injection Prevention

Always use parameterized queries through Supabase client:

```tsx
// ✅ Safe - uses parameterized query
const { data } = await supabase
  .from('hunts')
  .select('*')
  .eq('id', huntId);

// ❌ Never do this - vulnerable to SQL injection
const query = `SELECT * FROM hunts WHERE id = '${huntId}'`;
```

## Data Protection

### Environment Variables

Sensitive data must be stored in environment variables:

```bash
# .env.local
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret

# Never commit secrets to git
# Use .env.example for documentation
```

### Data Encryption

Sensitive data at rest should be encrypted:

```tsx
import { encrypt, decrypt } from '@teamhunt/shared/crypto';

// Encrypt sensitive data before storage
const encryptedData = encrypt(sensitiveData, process.env.ENCRYPTION_KEY!);

// Decrypt when retrieving
const decryptedData = decrypt(encryptedData, process.env.ENCRYPTION_KEY!);
```

## CORS & CSP Configuration

### CORS Headers

API services must configure appropriate CORS headers:

```tsx
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://teamhunt.pro');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
```

### Content Security Policy

Next.js apps must implement CSP:

```tsx
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

## Error Handling

### Secure Error Messages

Never expose sensitive information in error messages:

```tsx
// ✅ Safe error handling
try {
  const result = await processPayment(paymentData);
} catch (error) {
  console.error('Payment processing error:', error); // Log full error
  return { error: 'Payment processing failed' }; // Generic user message
}

// ❌ Dangerous - exposes internal details
catch (error) {
  return { error: error.message }; // Could expose sensitive info
}
```

### Rate Limiting

Implement rate limiting on API endpoints:

```tsx
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
});

app.use('/api/', limiter);
```

## Security Headers

Implement security headers across all applications:

```tsx
// Express.js security middleware
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));
```

## Security Testing

### Automated Security Scanning

Run security scans as part of CI/CD:

```bash
# npm audit for dependency vulnerabilities
pnpm audit

# ESLint security rules
pnpm lint

# Type checking for potential issues
pnpm typecheck
```

### Manual Security Review

- Review all authentication flows
- Test authorization boundaries
- Validate input handling
- Check for information disclosure
- Verify secure communication (HTTPS)

## Incident Response

### Security Issue Reporting

1. **DO NOT** open public issues for security vulnerabilities
2. Email security@teamhunt.pro with details
3. Provide steps to reproduce
4. Allow reasonable time for response before disclosure

### Security Updates

- Monitor dependencies for security updates
- Apply security patches promptly
- Test security updates in staging first
- Document security changes in release notes

## Compliance

### Data Privacy

- Implement GDPR compliance for EU users
- Provide data export/deletion capabilities
- Maintain audit logs for data access
- Regular privacy policy updates

### Access Controls

- Principle of least privilege
- Regular access reviews
- Multi-factor authentication for admin accounts
- Secure credential management