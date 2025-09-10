import type { Meta, StoryObj } from '@storybook/react';
import { Example } from './Example';

const meta: Meta<typeof Example> = {
  title: 'UI/Example',
  component: Example,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Primary Button',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    text: 'Small Button',
    variant: 'primary',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    text: 'Large Button',
    variant: 'primary',
    size: 'large',
  },
};