import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OrganizerDashboard from './page';

describe('OrganizerDashboard', () => {
  it('should render the dashboard title', () => {
    render(<OrganizerDashboard />);
    
    expect(screen.getByText('Organizer Dashboard')).toBeInTheDocument();
  });

  it('should render the description text', () => {
    render(<OrganizerDashboard />);
    
    expect(screen.getByText('Manage your team hunts and challenges from here.')).toBeInTheDocument();
  });

  it('should render dashboard stats cards', () => {
    render(<OrganizerDashboard />);
    
    expect(screen.getByText('Active Hunts')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('Participants')).toBeInTheDocument();
  });

  it('should show initial counts as zero', () => {
    render(<OrganizerDashboard />);
    
    const counts = screen.getAllByText('0');
    expect(counts).toHaveLength(3);
  });

  it('should have proper styling classes', () => {
    const { container } = render(<OrganizerDashboard />);
    const mainDiv = container.firstChild;
    
    expect(mainDiv).toHaveClass('min-h-screen', 'bg-gray-50');
  });
});