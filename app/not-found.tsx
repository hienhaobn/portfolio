import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>
      <Link 
        href="/"
        className="px-4 py-2 bg-main text-main-foreground rounded-md hover:bg-opacity-80 transition-all"
      >
        Return Home
      </Link>
    </div>
  );
} 