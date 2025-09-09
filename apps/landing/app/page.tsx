import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to TeamHunt
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Organize amazing team hunts and challenges
        </p>
        <Link
          href="https://app.teamhunt.pro"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Launch Organizer
        </Link>
      </div>
    </div>
  );
}