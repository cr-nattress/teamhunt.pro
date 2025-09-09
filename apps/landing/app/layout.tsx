import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TeamHunt - Organize Amazing Team Hunts',
  description: 'Create and manage team hunts and challenges for your organization.',
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