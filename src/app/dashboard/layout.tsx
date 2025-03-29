import UserInfo from "@/components/dashboard/user-info/UserInfo";

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
          <a href='/dashboard' className='block hover:text-gray-300'>
            Dashboard
          </a>
          <a href='/dashboard/categories' className='block hover:text-gray-300'>
            Categories
          </a>
          <a href='/dashboard/posts' className='block hover:text-gray-300'>
            Posts
          </a>
          <a href='/api/auth/signout' className='block hover:text-gray-300'>
            Logout
          </a>
        </nav>
      </aside>
      <main className='flex-1 p-5'>{children}</main>
    </div>
  );
}
