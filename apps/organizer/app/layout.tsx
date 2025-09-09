import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TeamHunt Organizer - Dashboard',
  description: 'Organize and manage team hunts, challenges, and participants.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}