# Example Component

A flexible button component that demonstrates the UI library structure.

## Props

- `text` (string, required): The button text to display
- `variant` ('primary' | 'secondary', optional): Visual style variant (default: 'primary')
- `size` ('small' | 'medium' | 'large', optional): Button size (default: 'medium')
- `onClick` (function, optional): Click handler

## Usage

```tsx
import { Example } from '@teamhunt/ui';

// Basic usage
<Example text="Click me" />

// With variants and sizes
<Example text="Primary Large" variant="primary" size="large" />
<Example text="Secondary Small" variant="secondary" size="small" />

// With click handler
<Example 
  text="Interactive" 
  onClick={() => console.log('Button clicked!')} 
/>
```

## Styling

Uses Tailwind CSS classes for styling. Ensure your application has Tailwind CSS configured to see proper styling.