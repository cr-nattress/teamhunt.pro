[**@teamhunt/shared**](../README.md)

***

[@teamhunt/shared](../README.md) / serverEnvSchema

# Variable: serverEnvSchema

> `const` **serverEnvSchema**: `ZodObject`\<\{ `NODE_ENV`: `ZodDefault`\<`ZodEnum`\<\[`"development"`, `"production"`, `"test"`\]\>\>; `PORT`: `ZodDefault`\<`ZodString`\>; `SUPABASE_URL`: `ZodDefault`\<`ZodString`\>; `SUPABASE_ANON_KEY`: `ZodDefault`\<`ZodString`\>; `SUPABASE_SERVICE_ROLE_KEY`: `ZodOptional`\<`ZodString`\>; `DATABASE_URL`: `ZodDefault`\<`ZodString`\>; `JWT_SECRET`: `ZodOptional`\<`ZodString`\>; `EMAIL_API_KEY`: `ZodOptional`\<`ZodString`\>; `MEDIA_BUCKET`: `ZodOptional`\<`ZodString`\>; \}, `"strip"`, `ZodTypeAny`, \{ `NODE_ENV`: `"development"` \| `"production"` \| `"test"`; `PORT`: `string`; `SUPABASE_URL`: `string`; `SUPABASE_ANON_KEY`: `string`; `SUPABASE_SERVICE_ROLE_KEY?`: `string`; `DATABASE_URL`: `string`; `JWT_SECRET?`: `string`; `EMAIL_API_KEY?`: `string`; `MEDIA_BUCKET?`: `string`; \}, \{ `NODE_ENV?`: `"development"` \| `"production"` \| `"test"`; `PORT?`: `string`; `SUPABASE_URL?`: `string`; `SUPABASE_ANON_KEY?`: `string`; `SUPABASE_SERVICE_ROLE_KEY?`: `string`; `DATABASE_URL?`: `string`; `JWT_SECRET?`: `string`; `EMAIL_API_KEY?`: `string`; `MEDIA_BUCKET?`: `string`; \}\>

Defined in: [packages/shared/src/env.ts:4](https://github.com/cr-nattress/teamhunt.pro/blob/b3814d7b45f5c909b52a6c1c7606fbf047d3b506/packages/shared/src/env.ts#L4)
