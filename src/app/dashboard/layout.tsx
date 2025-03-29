import UserInfo from "@/components/dashboard/user-info/UserInfo";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen'>
      <aside className='w-48 bg-gray-900 text-white p-5'>
        <h2 className='text-xl font-bold'>
          <UserInfo />
        </h2>
        <nav className='mt-5 space-y-3'>
          <Link href='/dashboard' className='block hover:text-gray-300'>
            Dashboard
          </Link>
          <Link
            href='/dashboard/categories'
            className='block hover:text-gray-300'
          >
            Categories
          </Link>
          <Link href='/dashboard/posts' className='block hover:text-gray-300'>
            Posts
          </Link>
          <Link href='/api/auth/signout' className='block hover:text-gray-300'>
            Logout
          </Link>
        </nav>
      </aside>
      <main className='flex-1 p-5'>{children}</main>
    </div>
  );
}
