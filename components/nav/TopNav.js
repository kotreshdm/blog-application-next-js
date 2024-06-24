import Link from "next/link";
import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import { useSession, signOut } from "next-auth/react";
const TopNav = () => {
  const { data, status, loading } = useSession();
  console.log(data, status);
  return (
    <nav className='nav shadow justify-content-between mb-3'>
      <div className='d-flex justify-content-start'>
        <Link href='/' className='nav-link'>
          Blog
        </Link>

        <a className='nav-link' href='/blog/create'>
          Write a Blog
        </a>
      </div>
      <div className='d-flex align-items-center'>
        {status === "authenticated" ? (
          <>
            <Link className='nav-link' href='/dashboard/user'>
              {data?.user?.name}
            </Link>

            {data?.user?.role
              ?.filter((r) => r !== "subscriber")
              .map((r) => (
                <Link className='nav-link' href={`/dashboard/${r}`}>
                  {r?.charAt(0).toUpperCase()}
                  {r?.slice(1)}
                </Link>
              ))}

            <a
              className='nav-link pointer'
              onClick={() => signOut({ callbackUrl: "/login" })}>
              Logout
            </a>
          </>
        ) : (
          <div className='d-flex justify-content-center'>
            <Link className='nav-link' href='/login'>
              Login
            </Link>

            <Link className='nav-link' href='/register'>
              Register
            </Link>
          </div>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default TopNav;
