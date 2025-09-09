#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Please provide a component name');
  console.log('Usage: npm run scripts:new:component ComponentName');
  process.exit(1);
}

// Validate component name (PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Component name must be in PascalCase (e.g., MyComponent)');
  process.exit(1);
}

const componentDir = join(__dirname, '../packages/ui/src/components', componentName);

// Check if component already exists
if (existsSync(componentDir)) {
  console.error(`❌ Component ${componentName} already exists`);
  process.exit(1);
}

// Create component directory
mkdirSync(componentDir, { recursive: true });

// Component file
const componentContent = `import React from 'react';

export interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children || '${componentName}'}
    </div>
  );
};

${componentName}.displayName = '${componentName}';
`;

// Story file
const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomContent: Story = {
  args: {
    children: 'Custom content for ${componentName}',
  },
};
`;

// README file
const readmeContent = `# ${componentName}

A React component for TeamHunt UI library.

## Usage

\`\`\`tsx
import { ${componentName} } from '@teamhunt/ui';

function App() {
  return (
    <${componentName}>
      Content goes here
    </${componentName}>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | undefined | Content to render inside the component |
| className | string | undefined | Additional CSS classes |

## Examples

### Default
\`\`\`tsx
<${componentName} />
\`\`\`

### With Custom Content
\`\`\`tsx
<${componentName}>
  Custom content here
</${componentName}>
\`\`\`
`;

// Index file
const indexContent = `export { ${componentName}, type ${componentName}Props } from './${componentName}';
`;

// Write files
writeFileSync(join(componentDir, `${componentName}.tsx`), componentContent);
writeFileSync(join(componentDir, `${componentName}.stories.ts`), storyContent);
writeFileSync(join(componentDir, 'README.md'), readmeContent);
writeFileSync(join(componentDir, 'index.ts'), indexContent);

console.log(`✅ Created ${componentName} component at:`);
console.log(`   📁 ${componentDir}/`);
console.log(`   📄 ${componentName}.tsx`);
console.log(`   📄 ${componentName}.stories.ts`);
console.log(`   📄 README.md`);
console.log(`   📄 index.ts`);
console.log('');
console.log('Next steps:');
console.log(`1. Export the component from packages/ui/src/index.ts`);
console.log(`2. Run "npm run sb:dev" to view in Storybook`);