import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
      {/* Warning Icon */}
      <ExclamationTriangleIcon className='w-24 h-24 text-yellow-500 mb-4' />

      {/* 404 Heading */}
      <h1 className='text-6xl font-bold'>404</h1>

      {/* Page Not Found Message */}
      <h2 className='text-2xl font-semibold mt-2'>Page Not Found</h2>
      <p className=' mt-2'>We couldn't find the page you're looking for.</p>

      {/* Button to Home */}
      <Link href='/' passHref>
        <button className='mt-6 px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-md hover:bg-blue-700 transition'>
          Go to Home
        </button>
      </Link>
    </div>
  );
}
