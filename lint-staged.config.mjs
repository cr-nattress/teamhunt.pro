export default {
  // Format all supported file types with Prettier
  '*.{ts,tsx,js,jsx,json,md,mdx,yml,yaml}': ['prettier --write'],
  
  // Lint and fix JavaScript/TypeScript files
  '*.{ts,tsx,js,jsx}': ['eslint --fix'],
  
  // Type check TypeScript files (without fixing, just validation)
  '*.{ts,tsx}': () => 'pnpm typecheck'
};