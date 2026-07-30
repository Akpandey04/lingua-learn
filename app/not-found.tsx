import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <span className="text-7xl">🌍</span>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400">
        The lesson or page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
